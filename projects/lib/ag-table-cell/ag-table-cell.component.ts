import { Component, OnInit, HostBinding, Input, AfterViewInit, ChangeDetectorRef, AfterViewChecked, OnDestroy, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { TRANSLATION } from './ag-table-cell.component.trans';
import { AgTableRowComponent } from '../ag-table-row/ag-table-row.component';
import { Helper, isNullOrUndefined } from '../services/helper';

@Component({
	selector: 'ag-table-cell',
	templateUrl: './ag-table-cell.component.html'
})
export class AgTableCellComponent implements OnInit, OnChanges, OnDestroy {
	@HostBinding('class.ag-table-cell') public class: boolean = true;

	@Input('no-truncate') public noTruncate: boolean = false;

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
		private helper: Helper,
		public detectorRef: ChangeDetectorRef
	) {
		this.truncate = !this.noTruncate;
	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes) {
			if ('noTruncate' in changes) {
				this.noTruncate = (typeof this.noTruncate === 'string' && (this.noTruncate === '' || this.noTruncate === 'true')) ? true : this.noTruncate;
				this.truncate = !this.noTruncate && (!this.parent || !this.parent.noTruncate);
			}
		}
	}

	public onRender(parent: AgTableRowComponent, index) {
		this.cellIndex = index;
		this.parent = parent;

		this.truncate = !this.noTruncate && (!this.parent || !this.parent.noTruncate);

		this.setWidth();
	}

	public setWidth() {
		if (this.elRef && this.el) {
			let newWidth = this.col ? this.col._width : 'auto';
			let newMaxWidth = newWidth;

			if (newWidth && newWidth.endsWith('%'))
				newMaxWidth = ((this.helper.onlyNumberAndToFloat(newWidth) * this.parent.parent.el.clientWidth) / 100) + 'px';

			if (newWidth !== this.el.style.width || newMaxWidth !== this.el.style.maxWidth) {
				this.el.style.width = newWidth;
				this.el.style.maxWidth = newMaxWidth;
			}
		}
	}

	ngOnDestroy() {
	}
}
