import { Component, OnInit, HostBinding, ContentChildren, QueryList, AfterViewInit, Input, ElementRef, OnDestroy, Renderer, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TRANSLATION } from './ag-table-body.component.trans';
import { AgTableRowComponent } from '../ag-table-row/ag-table-row.component';
import { AgTableComponent } from '../ag-table/ag-table.component';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AgTableVirtualScrollModel } from '../models/ag-table-virtual-scroll.model';
import { AgTableVirtualScrollService } from '../services/ag-table-virtual-scroll.service';
import { Helper } from './../services/helper';
import { HtmlHelper } from './../services/html.helper';

@Component({
	selector: 'ag-table-body',
	templateUrl: './ag-table-body.component.html'
})
export class AgTableBodyComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
	@HostBinding('class.ag-table-body') public class: boolean = true;
    @HostBinding('class.clickable') public clickable: boolean = false;

	@ViewChild('itemsContainer') public itemsContainerEl: ElementRef<HTMLElement>;

    @ContentChildren(AgTableRowComponent) private queryRows: QueryList<AgTableRowComponent>;

    public minHeight: number = 40;

	@Input('row-height') rowHeight: string = this.minHeight + 'px';
	@Input('empty-msg') emptyMsg: string = 'You do not have data to display.';

	public get rows() { return this.queryRows ? this.queryRows.toArray() : []; }

	public parent: AgTableComponent;

	public dictionary = TRANSLATION;

	private subscription: Subscription;

	public scrollInBottom: boolean = false;
    public scrollEnabled: boolean = false;

    public virtualScroll: AgTableVirtualScrollModel;

	private lastScrollTop: number = -1;

	constructor(
		private renderer: Renderer,
		private helper: Helper,
		public el: ElementRef<HTMLElement>,
		private dataVirtualScrollService: AgTableVirtualScrollService
	) {
	}

	ngOnInit() {
        this.virtualScroll = new AgTableVirtualScrollModel({
            containerSrollEl: this.el
        });
	}

	ngAfterViewInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
        if ('rowHeight' in changes) {
            if (this.helper.onlyNumbers(this.rowHeight) === this.rowHeight)
                this.rowHeight += 'px';

            if (isNullOrUndefined(this.rowHeight) || this.rowHeight === '') {
                this.rowHeight = this.minHeight + 'px';
                return;
            }
            else {
                let number = this.helper.onlyNumbers(this.rowHeight);
                let unit = this.rowHeight.replace(number, '');

                if (unit !== 'px') {
                    this.rowHeight = this.minHeight + 'px';
                    console.warn(`The row-height is invalid. The height must be informed in "px".`);
                    return;
                }
            }

            let number = parseInt(this.helper.onlyNumbers(this.rowHeight));
            if (number < this.minHeight) {
                this.rowHeight = this.minHeight + 'px';
                console.warn(`The row-height is invalid because the minimum height should be "${this.minHeight}px".`);
                return;
            }
        }
	}

	public onRender(parent: AgTableComponent) {
		this.parent = parent;
		this.configureChildrens();
		this.applyListeners();
		this.scrollEnabled = this.parent.loading;

		if (this.dataVirtualScrollService.canApplyVirtualScroll(this))
			this.dataVirtualScrollService.defineItens(this);
		else
			this.parent.items = this.parent.filteredItems;

		if (this.subscription) this.subscription.unsubscribe();
		this.subscription = this.queryRows.changes.subscribe(this.configureChildrens.bind(this));
	}

	public configureChildrens() {
		this.clickable = this.parent.clickable;
		this.rows.forEach((row, index) => {
			row.onRender(this, index);
		});
	}

	private applyListeners() {
		this.renderer.listen(this.el.nativeElement, 'scroll', this.onScroll.bind(this));
        this.renderer.listen(this.el.nativeElement, 'mousewheel', this.onMouseWheel.bind(this));
        this.renderer.listen(this.el.nativeElement, 'DOMMouseScroll', this.onMouseWheel.bind(this));
	}

	public dataTableInBottom() {
		let element = this.el.nativeElement;
		return element ? ((element.clientHeight + element.scrollTop) >= element.scrollHeight) : false;
	}

	onLoading() {
		if (this.parent.infinity > 0 && this.parent.currentPage !== 1 && this.parent.loading) {
			if (this.el && this.el.nativeElement) {
				let element = this.el.nativeElement;
				let stepTime = 10;
				let countTime = 0;
				let interval = setInterval(() => {
					try {
						if (this.parent.loading) {
							countTime += stepTime;
							HtmlHelper.srollBottom(element);
							if (countTime >= 150)
								clearInterval(interval);
						}
						else
							clearInterval(interval);
					}
					catch { clearInterval(interval); }
				}, stepTime);
			}
		}
	}

	private onScrollFinished() {
		if (this.parent.infinity && this.parent && !this.parent.dataAreOver) {
			this.parent.currentPage++;
			this.parent.emitGetData();
		}
	}

	private onScroll() {
		if (!this.parent.loading) {
			if (this.dataTableInBottom()) {
				if (!this.scrollInBottom) {
					this.scrollInBottom = true;
					this.onScrollFinished();
				}
			}
			else
				this.scrollInBottom = false;
		}

		if (this.dataVirtualScrollService.canApplyVirtualScroll(this))
			if (this.lastScrollTop !== this.virtualScroll.currentSrollTop) {
				this.lastScrollTop = this.virtualScroll.currentSrollTop;
				this.dataVirtualScrollService.onScrollChange(this);
			}
	}

	public backToTheTop() {
		this.el.nativeElement.scrollTop = 0;
	}

	public getRowIndexBasedVirtual(virtualIndex: number) {
		return this.virtualScroll.currentStartIndex + virtualIndex;
	}

    private onMouseWheel() {
		if (!this.dataVirtualScrollService.canApplyVirtualScroll(this))
			this.onScroll();
    }

	ngOnDestroy() {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
