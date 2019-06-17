import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-event-ag-table',
    templateUrl: './event-ag-table.component.html',
    styleUrls: ['./event-ag-table.component.scss']
})
export class EventAgTableComponent implements OnInit {

    public classStr: string = '';

    constructor() {
        this.classStr = '' +
`export class AgTableEvent {
    page: number = 1;
    pageSize: number = 0;
    filters: { [key: string]: any };
    order: {
        field: string,
        asc: boolean
    } = {} as any;
    resetData: boolean = false;

    constructor(obj: Partial<AgTableEvent>) {
        Object.assign(this, obj);
    }
}`;
    }

    ngOnInit() {
    }

}
