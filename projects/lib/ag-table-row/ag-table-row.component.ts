import { Component, OnInit, HostBinding, QueryList, ContentChildren, AfterViewInit, OnDestroy, ElementRef, ViewContainerRef, ViewChild, SimpleChanges, OnChanges, Input } from '@angular/core';
import { TRANSLATION } from './ag-table-row.component.trans';
import { AgTableBodyComponent } from '../ag-table-body/ag-table-body.component';
import { AgTableCellComponent } from '../ag-table-cell/ag-table-cell.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'ag-table-row',
	templateUrl: './ag-table-row.component.html'
})
export class AgTableRowComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
	@HostBinding('class.ag-table-row') public class: boolean = true;

	@ContentChildren(AgTableCellComponent) private queryCells: QueryList<AgTableCellComponent>;

	@Input('no-truncate') public noTruncate: boolean = false;

	private set _height(value: string) {
		if (this.el){
			this.el.style.minHeight = value;
			this.el.style.height = value;
		}
	}
	private get _height() { return (this.el) ? this.el.style.minHeight : 'auto'; }

	public get cells() { return this.queryCells ? this.queryCells.toArray() : []; }

	public parent: AgTableBodyComponent;

	public virtualIndex: number;
	public index: number;

	public dictionary = TRANSLATION;

	private subscription: Subscription;

	public get el() { return (this.elRef && this.elRef.nativeElement) ? this.elRef.nativeElement : null; }

	constructor(
		private elRef: ElementRef<HTMLElement>,
		private viewContainer: ViewContainerRef,
	) {
	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes) {
			if ('noTruncate' in changes) {
				this.noTruncate = (typeof this.noTruncate === 'string' && (this.noTruncate === '' || this.noTruncate === 'true')) ? true : this.noTruncate;
				if (this.cells.length)
					this.cells.forEach(cell => {
						cell.truncate = !cell.noTruncate && !this.noTruncate;
					});
			}
		}
	}

	ngAfterViewInit() {
	}

	public onRender(parent: AgTableBodyComponent, virtualIndex: number) {
		this.parent = parent;
		this.virtualIndex = virtualIndex;
		this.index = this.parent.getRowIndexBasedVirtual(virtualIndex);
		this._height = this.parent.rowHeight;
		this.configureChildrens();
		this.defineClass();

		if (this.subscription) this.subscription.unsubscribe();
		this.subscription = this.queryCells.changes.subscribe(this.configureChildrens.bind(this));
	}

	public configureChildrens() {
		this.cells.forEach((cell, index) => {
			cell.onRender(this, index);
		});
	}

	private defineClass() {
		if (this.index >= 0) {
			let position = this.index + 1;
			let currentClassName = 'ag-table-row-' + ((position % 2) === 0 ? 'even' : 'odd');
			let previousClassName = 'ag-table-row-' + ((position % 2) === 0 ? 'odd' : 'even');

			if  (!this.el.classList.contains(currentClassName))
				this.el.classList.add(currentClassName);

			if  (this.el.classList.contains(previousClassName))
				this.el.classList.remove(previousClassName);
		}
	}

	ngOnDestroy() {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
