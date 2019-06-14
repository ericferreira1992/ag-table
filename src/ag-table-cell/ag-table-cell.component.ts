import { Component, OnInit, HostBinding, Input, AfterViewInit, ChangeDetectorRef, AfterViewChecked, OnDestroy, ElementRef } from '@angular/core';
import { TRANSLATION } from './ag-table-cell.component.trans';
import { AgTableRowComponent } from '../ag-table-row/ag-table-row.component';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'ag-table-cell',
	templateUrl: './ag-table-cell.component.html'
})
export class AgTableCellComponent implements OnInit, OnDestroy {
	@HostBinding('class.ag-table-cell') public class: boolean = true;

	public cellIndex: number = null;
	public parent: AgTableRowComponent;

	private destroyed: boolean = false;

	public get col() {
		if (!isNullOrUndefined(this.cellIndex) &&
			this.parent &&
			this.parent.parent &&
			this.parent.parent.parent &&
			this.parent.parent.parent.header &&
			this.parent.parent.parent.header.cols) {
			if (this.cellIndex < this.parent.parent.parent.header.cols.length)
				return this.parent.parent.parent.header.cols[this.cellIndex];
			else {
				console.error('There are more cells than columns. Please fix this.');
				return null;
			}
		}
		return null;
	}

	public dictionary = TRANSLATION;

	constructor(
		private el: ElementRef<HTMLElement>
	) {
	}

	ngOnInit() {
	}

	public onRender(parent: AgTableRowComponent, index) {
		this.cellIndex = index;
		this.parent = parent;

		this.setWidth();
	}

	public setWidth() {
		if (this.el && this.el.nativeElement) {
			let newWidth = this.col ? this.col._width : 'auto';
			if (newWidth !== this.el.nativeElement.style.width) {
				this.el.nativeElement.style.width = newWidth;
				this.el.nativeElement.style.maxWidth = newWidth;
			}
		}
	}

	ngOnDestroy() {
	}
}
