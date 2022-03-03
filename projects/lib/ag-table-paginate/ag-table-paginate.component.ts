import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostBinding, ElementRef } from '@angular/core';
import { TRANSLATION } from './ag-table-paginate.component.trans';
import { AgTableComponent } from '../ag-table/ag-table.component';

@Component({
    selector: 'ag-table-paginate',
    templateUrl: './ag-table-paginate.component.html'
})
export class AgTablePaginateComponent implements OnInit, OnChanges {
    @HostBinding('class.ag-table-paginate') public class: boolean = true;

    @Input() public length: number = 0;
    @Input() public current: number = 1;
    @Input() public disabled: boolean = false;
    @Input() public loading: boolean = false;
    @Input() public objCaption: { start: number, end: number, total: number };
    @Output() public change = new EventEmitter<number>();

    public dictionary = TRANSLATION;
    
	public parent: AgTableComponent;

    caption: string;
    public pages: any[] = [];

	public get el() { return (this.elRef && this.elRef.nativeElement) ? this.elRef.nativeElement : null; }

    constructor(
        private elRef: ElementRef<HTMLElement>
    ) {
    }

    ngOnInit() {
    }

	public onRender(parent: AgTableComponent) {
        this.parent = parent;
		this.parent.checkMinWidthcanApply();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('length' in changes || 'current' in changes)
            this.generate();
    }

    pageClick(page: number | string) {
        if (!this.disabled && (typeof page) !== 'string' && page >= 1 && page <= this.length && page !== this.current) {
            this.current = page as number;
            this.change.emit(this.current);
            this.generate();
        }
    }

    generate() {
        let current = this.current,
            last = this.length,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        if (this.current > 0 && this.length > 0) {
            for (let i = 1; i <= last; i++) {
                if (i === 1 || i === last || i >= left && i < right)
                    range.push(i);
            }

            for (let i of range) {
                if (l) {
                    if (i - l === 2)
                        rangeWithDots.push(l + 1);
                    else if (i - l !== 1)
                        rangeWithDots.push('...');
                }
                rangeWithDots.push(i);
                l = i;
            }
        }

        this.pages = rangeWithDots;
    }
}
