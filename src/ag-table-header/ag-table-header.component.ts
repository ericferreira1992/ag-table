import { Component, OnInit, HostBinding, QueryList, ContentChildren, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { TRANSLATION } from './ag-table-header.component.trans';
import { AgTableComponent } from '../ag-table/ag-table.component';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { AgTableFilterMode } from '../enums/ag-table-filter-mode.enum';
import { AgTableColComponent } from '../ag-table-col/ag-table-col.component';

@Component({
	selector: 'ag-table-header',
	templateUrl: './ag-table-header.component.html'
})
export class AgTableHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
	@HostBinding('class.ag-table-header') private class: boolean = true;

	@ContentChildren(AgTableColComponent) private queryCols: QueryList<AgTableColComponent>;

	public get cols() { return this.queryCols ? this.queryCols.toArray() : []; }

	public get height() { return (this.el && this.el.nativeElement) ? `${this.el.nativeElement.clientHeight}px` : '0px'; }

	public get visible() { return (this.el && this.el.nativeElement) ? this.el.nativeElement.style.visibility !== 'hidden' : false; }
	public set visible(value: boolean) {
		if ((this.el && this.el.nativeElement))
			this.el.nativeElement.style.visibility = (value ? '' : 'hidden');
	}

	public parent: AgTableComponent;

	public dictionary = TRANSLATION;

	public frmFilter: FormGroup;

	public colSorting: { col: AgTableColComponent, asc: boolean } = null;

	public get filterCtrls(): { [key: string]: AbstractControl } { return (this.frmFilter && this.frmFilter.controls) ? this.frmFilter.controls : null; }

	private lastBodyWidth: string = null;
	private listenBodyWidth: any = null;

	constructor(
		public el: ElementRef<HTMLElement>,
		private fb: FormBuilder
	) {
		this.frmFilter = this.fb.group({ none: [null] });
		this.listenBodyWidth = setInterval(this.onBodyWidthChange.bind(this));
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	private makeForm() {
		let objControls = {};

		this.cols.forEach((col) => {
			if (col.canFilter) {
				if (col.field) {
					objControls[col.field] = col.makeFormControl();

					if (col.disableFilter) {
						objControls[col.field].disable();
					}
				}
				else {
					(col.customFilter as { field: string, mode?: AgTableFilterMode, value?: any }[]).forEach((custom) => {
						objControls[custom.field] = col.makeFormControl(custom.value ? custom.value : null);

						if (col.disableFilter) {
							objControls[col.field].disable();
						}
					});
				}
			}
		});

		if (Object.keys(objControls).length === 0)
			objControls['none'] = this.fb.control(null);

		this.frmFilter = this.fb.group(objControls);

		if (this.parent && this.parent.loading)
			this.frmFilter.disable();
	}

	public enableForm() {
		this.cols.forEach((col) => {
			if (col.canFilter) {
				if (col.field)
					this.checkFilterStatus(col.field, col);
				else if (col.customFilter)
					(col.customFilter as { field: string, mode?: AgTableFilterMode, value?: any }[]).forEach((custom) => {
						this.checkFilterStatus(custom.field, col);
					});
			}
		});
	}

	private checkFilterStatus(field: string, col: AgTableColComponent) {
		let control = this.filterCtrls[field];

		if (control) {
			if (col.disableFilter)
				control.disable();
			else
				control.enable();
		}
	}

	private checkDefaultValue(field: string, value: string, col: AgTableColComponent) {
		let control = this.filterCtrls[field];

		if (control && value)
			control.setValue(col.filterValue);
	}

	public onRender(parent: AgTableComponent) {
		this.parent = parent;
		this.configureChildrens();
		this.queryCols.changes.subscribe(this.configureChildrens.bind(this));
	}

	public configureChildrens() {
		this.makeForm();
		this.cols.forEach((col, index) => {
			col.onRender(this, index);

			if (col.field)
				this.checkDefaultValue(col.field, col.filterValue, col);
			else if (col.customFilter)
				(col.customFilter as { field: string, mode?: AgTableFilterMode, value?: any }[]).forEach((custom) => {
					this.checkDefaultValue(custom.field, custom.value, col);
				});
		});

		if (this.colSorting) {
			if (this.parent.initialized)
				this.parent.onSortChange();
		}
		else if (this.cols.some(x => x.sort === 'asc' || x.sort === 'desc')) {
			let colSort = this.cols.find(x => x.sort === 'asc' || x.sort === 'desc');
			this.colSorting = {
				col: colSort,
				asc: colSort.sort === 'asc'
			};
			colSort.sort = null;
			if (this.parent.initialized)
				this.parent.onSortChange();
		}

		if (this.parent)
			this.parent.definePaddingTop();
	}

	public getColByField(field: string) {
		return this.cols.find(col => {
			if (col.field)
				return col.field === field;
			else if (col.customFilter)
				return (col.customFilter as any[]).some(x => x.field === field);
			return false;
		});
	}

	public getColFilterModeByField(field: string) {
		let col = this.getColByField(field);
		if (col) {
			if (col.field)
				return col.mode;
			else if (col.customFilter) {
				let customFilter = (col.customFilter as any[]).find(x => x.field === field);
				if (customFilter)
					return customFilter.mode;
			}
		}

		return AgTableFilterMode.CONTAINS;
	}

	public getFormDataModel() {
		let formValue = this.frmFilter.value as { [key: string]: any };
		let dataModel = {};

		for (let field in formValue) {
			let value = formValue[field];
			if (!isNullOrUndefined(value) && value !== '')
				dataModel[field] = value;
		}

		return dataModel;
	}

	private onBodyWidthChange() {
		if (this.el && this.el.nativeElement) {
			let currentWidth = '100%';
			if (this.parent && this.parent.body.itemsContainerEl && this.parent.body.itemsContainerEl.nativeElement)
				currentWidth = this.parent.body.itemsContainerEl.nativeElement.clientWidth + 'px';

			if (currentWidth !== this.lastBodyWidth) {
				this.lastBodyWidth = currentWidth;
				this.el.nativeElement.style.width = currentWidth;
				if (this.cols.length)
					this.cols.forEach(col => col.setWidth());
			}
		}
	}

	ngOnDestroy() {
		clearInterval(this.listenBodyWidth);
	}
}