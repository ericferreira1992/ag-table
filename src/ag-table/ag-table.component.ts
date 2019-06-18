import { Component, OnInit, HostBinding, ContentChildren, QueryList, AfterViewInit, AfterContentChecked, Input, OnChanges, ElementRef, SimpleChanges, EventEmitter, Output, ViewChild } from '@angular/core';
import { TRANSLATION } from './ag-table.component.trans';
import { AgTableHeaderComponent } from '../ag-table-header/ag-table-header.component';
import { AgTableBodyComponent } from '../ag-table-body/ag-table-body.component';
import { AgTableChangeAction } from '../enums/ag-table-change-action.enum';
import { AgTableEvent } from '../events/ag-table-event.event';
import { AgTablePrepareService } from '../services/ag-table-prepare.service';
import { isNullOrUndefined } from 'util';
import { AgTableVirtualScrollService } from '../services/ag-table-virtual-scroll.service';
import { AgTableDataRenderEvent } from '../events/ag-table-data-render.event';
import { Helper } from '../services/helper';

@Component({
	selector: 'ag-table',
	templateUrl: './ag-table.component.html'
})
export class AgTableComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked {
	@HostBinding('class.ag-table') public class: boolean = true;
	@HostBinding('class.ag-table-empty') public get showEmptyView() { return this.isDataEmpty && !this.noEmptyView; }

	@ContentChildren(AgTableHeaderComponent) private queryHeader: QueryList<AgTableHeaderComponent>;
	@ContentChildren(AgTableBodyComponent) private queryBody: QueryList<AgTableBodyComponent>;

	@ViewChild('headerShadowEl') private headerShadowEl: ElementRef<HTMLElement>;
	@ViewChild('headerShadowEl') private loadingEl: ElementRef<HTMLElement>;

	/** THAT WILL DEFINE THE DATA TABLE HEIGHT, AND IT WILL HAS SCROLL BAR IN CASE OF OVERFLOW.*/
	@Input() public height: string = 'auto';

	/** IF THE ROWS IT WILL HAVE CLICK (JUST ENABLED HOVER EFFECT AND CURSOR AS POINTER) */
	@Input() public clickable: boolean;

	/** THIS DEFINE IF WILL GO PAGINATE OR NOT */
	@Input() public paginate: number = null;

	/** THIS DEFINE IF WILL GO BRING DATA BASED ON SCROLLING WHEN TO ARRIVE ON BOTTOM. (BUT USE THIS ONLY WITH SERVER-SIDE) */
	@Input() public infinity: number = null;

	/** SHOW LOADING SPINNER ABOVE THE DATA TABLE WHEN LOADING IS TRUE. */
	@Input() public loading: boolean = null;

	/** THE TOTAL DATA LENGTH. THIS IS USED FOR MAKE THE PAGINATION. */
	@Input('data-length') public dataLength: number = 0;

	/** DETERMINES WHETHER DATA WILL BE SWALLOWED VIA SERVER-SIDE */
	@Input('server-side') public serverSide: boolean = false;

	/** CALL REQUEST DATA ON INITIALIZATION DATA TABLE */
	@Input('get-data-init') public getDataOnInit: boolean = false;

	/** SET THE CURRENT PAGE WHEN USE PAGINATION */
	@Input('current-page') public currentPage: number = 1;

	/** Notifies that the data is gone (infinite-scroll only). */
	@Input('data-are-over') public dataAreOver: boolean = false;

	/** Sets whether to display empty-view or not. */
	@Input('no-empty-view') public noEmptyView: boolean = false;

	@Input('items') allItems: any[] = [];

	/** CALL/EMIT EVENT TO GET DATA (SERVER-SIDE) */
	@Output() public onGetData = new EventEmitter<AgTableEvent>();

	/** EMIT EVENT WICH ITEMS HAVEN BEEN RENDERED */
	@Output() public onDataRender = new EventEmitter<AgTableDataRenderEvent<any>>();

	/** EMIT EVENT WHEN THE ag-table HAS ALL BEEN RENDERED */
	@Output() public onTableRender = new EventEmitter<void>();

	@Output() public  filterActivated = new EventEmitter<boolean>();

	private get paddingTop() { return this.el && this.el.nativeElement ? this.el.nativeElement.style.paddingTop : '0px'; }
	private set paddingTop(value: string) { if (this.el && this.el.nativeElement) this.el.nativeElement.style.paddingTop = value; }

	private set _height(value: string) {
		this.el.nativeElement.style.height = value;

		if (this.header) {
			if (value === '0' || value === '0px')
				this.header.visible = false;
			else
				this.header.visible = true;
		}

		this.definePaddingTop();
	}
	private get _height() { return this.el.nativeElement.style.height; }

	public items: any[] = [];
	public filteredItems: any[] = [];

	public get header() { return this.queryHeader ? this.queryHeader.first : null; }
	public get body() { return this.queryBody ? this.queryBody.first : null; }

	public get topShadow() {
		let body = (this.body && this.body.el && this.body.el.nativeElement) ? this.body.el.nativeElement : null;
		let header = (this.header && this.header.el && this.header.el.nativeElement) ? this.header.el.nativeElement : null;
		if (body && header)
			return body.scrollTop >= (header.clientHeight / 2);
		else
			return false;
	}

	public get bottomShadow() {
		let body = (this.body && this.body.el && this.body.el.nativeElement) ? this.body.el.nativeElement : null;
		let header = (this.header && this.header.el && this.header.el.nativeElement) ? this.header.el.nativeElement : null;
		if (body && header)
			return (body.scrollTop + body.clientHeight) < body.scrollHeight;
		else
			return false;
	}

	public get isPaging() { return this.paginate; }

	public get isSorting() { return this.header && this.header.colSorting; }

	public get isFiltering() { return ((this.header && this.header.cols) ? this.header.cols.some(x => x.canFilter) : false); }

	public get numPages() {
		if (this.dataLength && this.isPaging) {
			let pages = Math.floor(this.dataLength / this.paginate);
			return pages + (((this.dataLength / this.paginate) > pages) ? 1 : 0);
		}
		else
			return 0;
	}

	public dictionary = TRANSLATION;

	public initialized: boolean = false;

	public isDataEmpty: boolean = false;

	private dataPaginatedLength: number = 0;
	public paginateCaptionConfig: { start: number, end: number, total: number };
	public actionChange: AgTableChangeAction = AgTableChangeAction.INITIALIZE;

	private DOMisVisible: boolean = false;
	private DOMcountVisibleChange: number = 0;

	constructor(
		public el: ElementRef<HTMLElement>,
		private helper: Helper,
		private dataPrepareService: AgTablePrepareService,
		private dataVirtualScrollService: AgTableVirtualScrollService
	) {
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.body.onRender(this);
			this.header.onRender(this);

			this.queryHeader.changes.subscribe(() => this.definePaddingTop());

			this.definePaddingTop();

			setTimeout(() => this.onTableRender.emit());

			if (this.getDataOnInit)
				this.emitGetData();

			if (this.infinity && !this.heightIsValid())
				console.warn(`The infinity scroll mode not working, because data table height has not been set.`);

			if (!this.infinity && this.body)
				this.body.backToTheTop();

			this.filterActivated.emit(false);
			this.initialized = true;
		});
	}

	ngAfterContentChecked() {
		if (this.el && this.el.nativeElement) {
			let elem = this.el.nativeElement;
			let visible = !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
			if (visible !== this.DOMisVisible) {
				this.DOMisVisible = visible;

				if (this.DOMisVisible && this.DOMcountVisibleChange > 0)
					this.body.onScroll();
					
				this.DOMcountVisibleChange++;
			}
		}
		else
			this.DOMisVisible = false;
	}

	ngOnChanges(changes: SimpleChanges) {
		setTimeout(() => {
			if ('serverSide' in changes)
				this.serverSide = (typeof this.serverSide === 'string' && (this.serverSide === '' || this.serverSide === 'true')) ? true : this.serverSide;

			if ('noEmptyView' in changes)
				this.noEmptyView = (typeof this.noEmptyView === 'string' && (this.noEmptyView === '' || this.noEmptyView === 'true')) ? true : this.noEmptyView;

			if ('clickable' in changes) {
				this.clickable = (typeof this.clickable === 'string' && (this.clickable === '' || this.clickable === 'true')) ? true : this.clickable;
				if (this.body)
					this.body.clickable = this.clickable;
			}

			if ('height' in changes) {
				if (this.height !== 'auto' && !this.heightIsValid()) {
					console.warn(`The height of table is invalid.`);
					this.height = 'auto';
				}

				this._height = this.height;

				this.prepareItemsPagingAndFilter();

				if (!this.infinity && this.body)
					this.body.backToTheTop();
			}

			if ('currentPage' in changes) {
				if (typeof this.currentPage === 'string') {
					if (!isNaN(parseInt(this.currentPage)))
						this.currentPage = parseInt(this.currentPage);
					else {
						console.warn(`The current-page value of table is invalid. The current-page value has been defined as 1.`);
						this.currentPage = 1;
					}
				}

				if (typeof this.currentPage !== 'number' || this.currentPage <= 0) {
					console.warn(`The current-page value of table is invalid. The current-page value has been defined as 1.`);
					this.currentPage = 1;
				}

				if (this.currentPage > this.paginate && this.currentPage < 1)
					this.currentPage = 1;

				this.onPageChange(this.currentPage, !this.serverSide);
			}

			if ('paginate' in changes) {
				if (typeof this.paginate === 'string') {
					if (!isNaN(parseInt(this.paginate)))
						this.paginate = parseInt(this.paginate);
					else {
						console.warn(`The [paginate] value of table is invalid. The paginate has not been applied.`);
						this.paginate = null;
					}
				}

				if (this.isPaging && this.infinity){
					console.warn(`The [paginate] has not been applied because [infinity] already has been defined.`);
					this.paginate = null;
				}

				if (this.paginate) {
					if (this.currentPage > this.paginate)
						this.currentPage = 1;

					if (this.serverSide)
						this.updatePaginateConfig();
				}

				this.onPageChange(this.currentPage, !this.serverSide);
				this.definePaddingBottom();
			}

			if ('infinity' in changes) {
				if (typeof this.infinity === 'string') {
					if (!isNaN(parseInt(this.infinity)))
						this.infinity = parseInt(this.infinity);
					else {
						console.warn(`The [infinity] value of table is invalid. The infinity scroll has not been applied.`);
						this.infinity = null;
					}
				}

				if (this.infinity && this.paginate){
					console.warn(`The [infinity] has not been applied because [paginate] already has been defined.`);
					this.infinity = null;
				}

				this.onPageChange(this.currentPage, !this.serverSide);
				this.definePaddingBottom();
			}

			if ('dataLength' in changes) {
				if (isNullOrUndefined(this.dataLength))
					this.dataLength = 0;

				this.updatePaginateConfig();
				this.definePaddingBottom();
			}

			if ('getDataOnInit' in changes)
				this.getDataOnInit = (typeof this.getDataOnInit === 'string' && (this.getDataOnInit === '' || this.getDataOnInit === 'true')) ? true : this.getDataOnInit;

			if ('loading' in changes) {
				setTimeout(() => {
					if (this.body)
						this.body.scrollEnabled = this.loading;
				});

				if (this._height.replace('px', '') === '0' && this.loading)
					this.el.nativeElement.style.height = '50px';

				if (this.header && this.header.frmFilter) {
					if (this.loading)
						this.header.frmFilter.disable();
					else {
						this.header.enableForm();
						this.updatePaginateConfig();
					}
				}
			}

			if ('allItems' in changes) {
				if (!this.serverSide)
					this.currentPage = 1;

				this.refreshRender();
			}
		}, 100);
	}

	private definePaddingBottom() {
		if (this.el && this.el.nativeElement) {
			let padding = '0px';
			if (!this.infinity)
				padding = '46px';

			if (padding !== this.el.nativeElement.style.paddingBottom)
				this.el.nativeElement.style.paddingBottom = padding;
		}
	}

	public definePaddingTop(forceDefine: boolean = false) {
		if (this.el && this.el.nativeElement && this.header) {
			let padding = '0px';
			if (this.header && this.header.el && this.header.el.nativeElement)
				if (this.header.visible)
					padding = this.header.height;

			if (forceDefine || padding !== this.el.nativeElement.style.paddingTop) {
				this.paddingTop = padding;

				if (this.headerShadowEl && this.headerShadowEl.nativeElement)
					this.headerShadowEl.nativeElement.style.height = padding !== '0px' ? padding : 'auto';
			}
		}
	}

	private heightIsValid() {
		return !isNullOrUndefined(this.height) && (typeof this.height === 'string') && this.height !== '' && this.height !== 'auto';
	}

	public setDataLength(length: number, paginatedLength: number) {
		this.dataLength = length;
		this.dataPaginatedLength = paginatedLength;
	}

	public onPageChange(currentPage: number, emit: boolean = true) {
		if (this.isPaging) {
			this.notifyChanges(AgTableChangeAction.PAGINATE);

			if (emit && this.serverSide) {
				this.setCurrentPage(currentPage);
				this.emitGetData();
			}
			else if (!this.serverSide) {
				this.setCurrentPage(currentPage, false);
				this.prepareItemsPagingAndFilter();
				this.updatePaginateConfig();
				this.body.backToTheTop();
			}
		}
	}

	public onSortChange() {
		this.notifyChanges(AgTableChangeAction.ORDER);

		if (this.serverSide) {
			this.setCurrentPage(1);
			this.emitGetData(this.infinity > 0);
		}
		else {
			this.prepareItemsPagingAndFilter();
			this.body.backToTheTop();
		}
	}

	public onFilterChange() {
		this.notifyChanges(AgTableChangeAction.FILTER);

		if (this.header && this.header.cols) {
			if (this.header.cols.some(x => x.filterActive)) {
				this.filterActivated.emit(true);
			} else {
				this.filterActivated.emit(false);
			}
		}

		if (this.serverSide) {
			this.setCurrentPage(1);
			this.emitGetData(this.infinity > 0);
		}
		else {
			this.prepareItemsPagingAndFilter();
			this.updatePaginateConfig();
			this.body.backToTheTop();
		}
	}

	private prepareItemsPagingAndFilter() {
		this.filteredItems = this.dataPrepareService.apply(this.allItems, this);

		if (this.body && this.dataVirtualScrollService.canApplyVirtualScroll(this.body))
			this.dataVirtualScrollService.defineItens(this.body);
		else {
			this.items = this.filteredItems;
			this.isDataEmpty = this.items.length === 0;
			this.emitDataRender();
		}
	}

	public emitGetData(resetData: boolean = false) {
		if (resetData) {
			this.currentPage = 1;
			this.dataVirtualScrollService.reset(this.body);
		}

		let colSort = this.header.colSorting;

		this.onGetData.emit(new AgTableEvent({
			page: this.currentPage,
			pageSize: this.paginate ? this.paginate : this.infinity,
			filters: this.header.getFormDataModel(),
			order: colSort ? { field: colSort.col.field, asc: colSort.asc } : null,
			resetData: resetData
		}));
	}

	private emitDataRender() {
		this.onDataRender.emit(new AgTableDataRenderEvent<any>({
			items: this.items,
			length: this.items.length,
			startIndex: 0,
			endIndex: this.items.length - 1
		}));
	}

	public setCurrentPage(page: number, updateConfig: boolean = true) {
		this.currentPage = page;
		if (updateConfig)
			this.updatePaginateConfig();
	}

	private updatePaginateConfig() {
		let visibleLength = this.dataPaginatedLength;

		if (this.serverSide && this.body)
			visibleLength = this.filteredItems.length;

		let page = this.paginate ? this.paginate : this.infinity;

		this.paginateCaptionConfig = {
			start: (page * (this.currentPage - 1)) + 1,
			end: (page * (this.currentPage - 1)) + visibleLength,
			total: this.dataLength ? this.dataLength : 0
		};
	}

	private notifyChanges(action: AgTableChangeAction = AgTableChangeAction.INITIALIZE) {
		this.actionChange = action;
	}

	public resetFilters(getData: boolean = false) {
		for (let ctrlName in this.header.filterCtrls) {
			this.header.filterCtrls[ctrlName].reset();
		}
		if (getData)
			this.emitGetData(true);
	}

	public refreshRender() {
		if (this.body) {
			if (!this.body.parent)
				this.body.parent = this;

			this.dataVirtualScrollService.preparePreviousItemAfterDataChange(this.body);
		}

		this.prepareItemsPagingAndFilter();
		this.updatePaginateConfig();
		this.definePaddingBottom();

		if (!this.infinity && this.body)
			this.body.backToTheTop();
	}
}
