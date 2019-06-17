import { Component, OnInit, HostBinding, QueryList, ContentChildren, AfterViewInit, OnDestroy, ElementRef, ViewContainerRef } from '@angular/core';
import { TRANSLATION } from './ag-table-row.component.trans';
import { AgTableBodyComponent } from '../ag-table-body/ag-table-body.component';
import { AgTableCellComponent } from '../ag-table-cell/ag-table-cell.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'ag-table-row',
	templateUrl: './ag-table-row.component.html'
})
export class AgTableRowComponent implements OnInit, AfterViewInit, OnDestroy {
	@HostBinding('class.ag-table-row') public class: boolean = true;

	@ContentChildren(AgTableCellComponent) private queryCells: QueryList<AgTableCellComponent>;

	private set _height(value: string) {
		if (this.el && this.el.nativeElement){
			this.el.nativeElement.style.minHeight = value;
		}
	}
	private get _height() { return (this.el && this.el.nativeElement) ? this.el.nativeElement.style.minHeight : 'auto'; }

	public get cells() { return this.queryCells.toArray(); }

	public parent: AgTableBodyComponent;

	public virtualIndex: number;
	public index: number;

	public dictionary = TRANSLATION;

	private subscription: Subscription;

	constructor(
		private el: ElementRef<HTMLElement>,
		private viewContainer: ViewContainerRef,
	) {
	}

	ngOnInit() {
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

			if  (!this.el.nativeElement.classList.contains(currentClassName))
				this.el.nativeElement.classList.add(currentClassName);

			if  (this.el.nativeElement.classList.contains(previousClassName))
				this.el.nativeElement.classList.remove(previousClassName);
		}
	}

	ngOnDestroy() {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
