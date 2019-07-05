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
	
	public get truncate() { return this.el.classList.contains('text-truncate'); }
	public set truncate(value: boolean) {
		if (this.el) {
			if (value)
				this.el.classList.add('text-truncate');
			else
				this.el.classList.remove('text-truncate');
		}
	}

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

	private get el() { return (this.elRef && this.elRef.nativeElement) ? this.elRef.nativeElement : null; }

	constructor(
		private elRef: ElementRef<HTMLElement>,
		public detectorRef: ChangeDetectorRef
	) {
		this.truncate = true;
	}

	ngOnInit() {
	}

	public onRender(parent: AgTableRowComponent, index) {
		this.cellIndex = index;
		this.parent = parent;

		this.truncate = !this.parent.noTruncate;

		this.setWidth();
	}

	public setWidth() {
		if (this.el) {
			let newWidth = this.col ? this.col._width : 'auto';
			if (newWidth !== this.el.style.width) {
				this.el.style.width = newWidth;
				this.el.style.maxWidth = newWidth;
			}
		}
	}

	ngOnDestroy() {
	}
}
