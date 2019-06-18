import { Component, OnInit, HostBinding, Input, OnChanges, SimpleChanges, ElementRef, AfterViewInit } from '@angular/core';
import { TRANSLATION } from './ag-table-col.component.trans';
import { AgTableHeaderComponent } from '../ag-table-header/ag-table-header.component';
import { isNullOrUndefined, isObject, isArray } from 'util';
import { FormBuilder } from '@angular/forms';
import { AgTableFilterMode } from '../enums/ag-table-filter-mode.enum';
import { AgTableFilterType } from '../enums/ag-table-filter-type.enum';
import { Helper } from './../services/helper';
import { AgTableLangService } from '../services/ag-table-lang.service';

@Component({
	selector: 'ag-table-col',
	templateUrl: './ag-table-col.component.html'
})
export class AgTableColComponent implements OnInit, OnChanges, AfterViewInit {
	@HostBinding('class.ag-table-col') public _class: boolean = true;

	@Input() public width: string = null;

	@Input('custom-filter') public customFilter: { field: string, mode?: AgTableFilterMode, value?: any } |
												 { field: string, mode?: AgTableFilterMode, value?: any }[] |
												 string |
												 string[];
	@Input() public filter: AgTableFilterType = AgTableFilterType.NONE;
	@Input() public field: string = '';
    @Input() public mode: AgTableFilterMode = null;
    @Input() public placeholder = '';
    @Input() public readOnly: boolean = false;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public dateFormat: string = '';
    @Input() public dateSeparator: string = '/';
	@Input() public optionAllLabel: string = '';
	@Input() public options: { text: string, value: any }[] | any[] = [];

	@Input('no-sort') public noSort: boolean = false;
	@Input('no-truncate') public noTruncate: boolean = false;
	@Input('sort') public sort: string = null;
	@Input('disable-filter') public disableFilter: boolean = false;
	@Input('filter-value') public filterValue: any = null;

	public set _width(value: string) {
		if (this.el && this.el.nativeElement){
			this.el.nativeElement.style.maxWidth = value;
			this.el.nativeElement.style.width = value;
		}
	}
	public get _width() { return (this.el && this.el.nativeElement) ? this.el.nativeElement.style.width : 'auto'; }

	public dictionary = TRANSLATION;

	public colIndex: number = 0;
	public parent: AgTableHeaderComponent;
	public canFiltering: boolean = false;
	public fields: string[] = [];

	public get canFilter() {
		return (this.filter && this.filter !== AgTableFilterType.NONE && this.filter.toString() !== '') ||
				(this.customFilter && (this.customFilter as any[]).length > 0);
	}

	public filterActive: boolean = false;

	public get isSorting() { return this.parent && this.parent.colSorting && this.parent.colSorting.col === this; }
	public get isSortAsc() { return this.isSorting && this.parent.colSorting.asc; }

	constructor(
		private helper: Helper,
        private langService: AgTableLangService,
		private fb: FormBuilder,
		private el: ElementRef<HTMLElement>
	) {
	}

	ngOnInit() {
		if (!this.noSort && !this.field) {
			this.filter = AgTableFilterType.NONE;
			console.warn(`The ordering will not applied because the [field] of column has not been defined.`);
		}
	}

    ngAfterViewInit() {
        if (!this.optionAllLabel)
            this.optionAllLabel = this.langService.getText('ALL_OPTION', this.dictionary);

        if (!this.dateFormat)
            this.dateFormat = this.langService.getText('DATE_FORMAT', this.dictionary);
    }

	ngOnChanges(changes: SimpleChanges) {
		if (!changes || 'width' in changes) {
			if (!this.widthIsValid())
				this.width = 'auto';

			if (this.widthIsValid() && this.helper.onlyNumbers(this.width) === this.width)
				this.width += 'px';
			if (this.parent && this.parent.cols) {
				let unit = this.getWidthUnit();
				if (unit !== '' && this.parent.cols.some((x) => x.getWidthUnit() !== '' && x.getWidthUnit() !== unit)) {
					let anotherUnit = this.parent.cols.find((x) => x.getWidthUnit() !== '' && x.getWidthUnit() !== unit).getWidthUnit();
					console.warn(`A another column has width defined with like "${anotherUnit}". So this [width] was redefined as "auto".`);
					this.width = 'auto';
					this.setWidth();
					return;
				}
			}

			if (this.getWidthUnit() === '%') {
				if (parseFloat(this.width.replace(this.getWidthUnit(), '')) >= 100){
					console.warn(`The columns cannot have width equal or greater than 100%.`);
					this.width = 'auto';
					this.setWidth();
					return;
				}
			}
			this.setWidth();
		}

		if (changes) {
			if ('noSort' in changes)
				this.noSort = (typeof this.noSort === 'string' && (this.noSort === '' || this.noSort === 'true')) ? true : this.noSort;
			if ('noTruncate' in changes)
				this.noTruncate = (typeof this.noTruncate === 'string' && (this.noTruncate === '' || this.noTruncate === 'true')) ? true : this.noTruncate;

			if ('sort' in changes) {
				this.sort = !this.sort ? null : this.sort;

				if (this.sort !== 'asc' && this.sort !== 'desc')
					this.sort = null;

				if (this.parent) {
					this.parent.colSorting = {
						col: this,
						asc: this.sort === 'asc'
					};
					this.sort = null;
					this.parent.parent.onSortChange();
				}
			}

			if ('filter' in changes) {
				if (!this.filter && this.filter.toString() !== '')
					this.filter = AgTableFilterType.NONE;
				else if (this.filter.toString() === '')
					this.filter = AgTableFilterType.TEXT;

				if (this.filter !== AgTableFilterType.NONE && !this.mode) {
					switch (this.filter) {
						case AgTableFilterType.TEXT:
						// case AgTableFilterType.FEDERAL_ID:
						// case AgTableFilterType.CARD_NUMBER:
						// case AgTableFilterType.CURRENCY:
						// case AgTableFilterType.CARD_MASK:
							this.mode = AgTableFilterMode.CONTAINS;
							break;
						case AgTableFilterType.SELECT:
						// case AgTableFilterType.DATE:
							this.mode = AgTableFilterMode.EQUALS;
							break;
						default:
							this.mode = AgTableFilterMode.CONTAINS;
							break;
					}
				}

				if (this.parent) {
					if (this.field && this.parent.filterCtrls[this.field]) {
						if (this.disableFilter)
							this.parent.filterCtrls[this.field].disable();
						else
							this.parent.filterCtrls[this.field].enable();
					}
					else if (this.customFilter)
						(this.customFilter as { field: string, mode?: AgTableFilterMode, value?: any }[]).forEach((custom) => {
							if (this.disableFilter)
								this.parent.filterCtrls[custom.field].disable();
							else
								this.parent.filterCtrls[custom.field].enable();
						});
				}

				if (this.canFilter && !this.field) {
					this.filter = AgTableFilterType.NONE;
					console.warn(`The filter will not applied because the [field] of column has not been defined.`);
				}

				setTimeout(() => {
					if (this.parent)
						this.parent.parent.definePaddingTop();
				});
			}

			if ('customFilter' in changes) {
				if (this.canFilter && this.field) {
					console.warn(`The [custom-filter] will not applied because the [filter] has already been defined.`);
					this.customFilter = null;
					return;
				}
				else {
					if (this.customFilter && (isObject(this.customFilter) || typeof this.customFilter === 'string')) {
						if (isObject(this.customFilter) && !isArray(this.customFilter))
							this.customFilter = [(this.customFilter as any)];
						else if (isArray(this.customFilter) && ((this.customFilter as any[]).length > 0 && typeof this.customFilter[0] === 'string'))
							this.customFilter = (this.customFilter as string[]).map(field => ({ field }));
						else if (!isObject(this.customFilter))
							this.customFilter = [{ field: this.customFilter}] as any[];

						if (!isArray(this.customFilter) || !(this.customFilter as any[]).every(x => (isObject(x) && x.field) ? true : false)){
							console.warn(`The [custom-filter] will not applied because field has not been informed or is invalid. The value should look like this: { field: string, mode?: string }`);
							this.customFilter = null;
						}
						else {
							this.noSort = true;

							(this.customFilter as any[]).forEach((filter) => {
								if (!filter.mode)
									filter.mode = AgTableFilterMode.CONTAINS;
							});

							setTimeout(() => {
								if (this.parent)
									this.parent.parent.definePaddingTop();
							});
						}
					}
					else {
						console.warn(`The [custom-filter] will not applied because value is invalid. The value should look like this: { field: string, mode?: string }`);
						this.customFilter = null;
					}
				}
			}
		}
	}

	public makeFormControl(defaultValue: any = null) {
		return this.fb.control(defaultValue);
	}

	public onFiltering() {
		if (this.parent && this.parent.parent) {
			if (this.parent) {
				if (this.field)
					this.filterActive = (this.parent.filterCtrls[this.field] && this.parent.filterCtrls[this.field].value !== null);
				else if (this.customFilter)
					this.filterActive = (this.customFilter as { field: string, mode?: AgTableFilterMode, value?: any }[]).some((custom) => {
						return this.parent.filterCtrls[custom.field] && this.parent.filterCtrls[custom.field].value !== null;
					});
			}
			else
				this.filterActive = false;

			this.parent.parent.onFilterChange();
		}
	}

	public onFilterRender() {
		if (this.parent)
			this.parent.parent.definePaddingTop();
	}

	public toggleSort() {
		if (this.parent && this.parent.parent && !this.parent.parent.loading) {
			let asc;
			if (this.isSorting) {
				if (this.parent.colSorting.asc) {
					asc = false;
					this.parent.colSorting = {
						col: this,
						asc: asc
					};
				} else {
					this.parent.colSorting = null;
				}
			} else {
				asc = true;
				this.parent.colSorting = {
					col: this,
					asc: asc
				};
			}

			this.parent.parent.onSortChange();
		}
	}

	private widthIsValid() {
		return !isNullOrUndefined(this.width) && (typeof this.width === 'string') && this.width !== '' && this.width !== 'auto';
	}

	private getWidthUnit() {
		return this.widthIsValid() ? this.width.replace(this.helper.onlyNumbers(this.width), '') : '';
	}

	public onRender(parent: AgTableHeaderComponent, index) {
		this.parent = parent;
		this.colIndex = index;
		this.canFiltering = this.canFilter && !isNullOrUndefined(this.parent.filterCtrls);
		this.fields = this.generateFieldsFilter();
		this.setWidth();
		this.ngOnChanges(null);
	}

	private generateFieldsFilter() {
		if (this.canFilter) {
			if (this.field)
				return [this.field];
			else
				return (this.customFilter as any[]).map((custom) => custom.field);
		}
		return [];
	}

	public setWidth() {
		if (this.parent && this.parent.parent.body.itemsContainerEl && this.parent.parent.body.itemsContainerEl.nativeElement) {
			if (!this.widthIsValid()) {
				let unit = '';
				if (this.parent.cols.some((x, i) => x.getWidthUnit() !== ''))
				unit = this.parent.cols.find((x, i) => x.getWidthUnit() !== '').getWidthUnit();

				if (!unit || unit === 'px') {
					let colsWithWidth = this.parent.cols.filter((x, i) => i !== this.colIndex && x.widthIsValid());
					let widthDiff = colsWithWidth.reduce((prev, curr) => prev + parseFloat(this.helper.onlyNumbers(curr.width)), 0);
					let containerWidth = this.parent.parent.body.itemsContainerEl.nativeElement.clientWidth;
					this._width = (containerWidth - widthDiff) / Math.abs(this.parent.cols.length - colsWithWidth.length) + 'px';
				}
				else {
					let colsWithWidth = this.parent.cols.filter((x, i) => i !== this.colIndex && x.widthIsValid());
					let widthDiff = colsWithWidth.reduce((prev, curr) => prev + parseFloat(this.helper.onlyNumbers(curr.width)), 0);
					this._width = (100 - widthDiff) / Math.abs(this.parent.cols.length - colsWithWidth.length) + unit;
				}
			}
			else
			this._width = this.width;
		}
		else
			this._width = 'auto';

		this.setCellsWidth();
	}

	private setCellsWidth() {
		if (this.parent && this.parent.parent.body && this.parent.parent.body.rows.length) {
			this.parent.parent.body.rows.forEach(row => {
				let cell = row.cells.find(cell => cell.cellIndex === this.colIndex);
				if (cell)
					cell.setWidth();
			});
		}
	}
}
