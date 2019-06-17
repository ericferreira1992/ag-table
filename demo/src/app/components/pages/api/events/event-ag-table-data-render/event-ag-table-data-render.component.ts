import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-event-ag-table-data-render',
    templateUrl: './event-ag-table-data-render.component.html',
    styleUrls: ['./event-ag-table-data-render.component.scss']
})
export class EventAgTableDataRenderComponent implements OnInit {

    public classStr: string = '';

    constructor() {
        this.classStr = '' +
`export class AgTableDataRenderEvent<T> {
    public items: T[] = [];
    public length: number = 0;
    public startIndex: number = 0;
    public endIndex: number = 0;
}
`;
    }

    ngOnInit() {
    }

}
