import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-enum-ag-table-filter-mode',
    templateUrl: './enum-ag-table-filter-mode.component.html',
    styleUrls: ['./enum-ag-table-filter-mode.component.scss']
})
export class EnumAgTableFilterModeComponent implements OnInit {

    public classStr: string = '';

    constructor() {
        this.classStr = '' +
`export enum AgTableFilterMode {
    CONTAINS = 'contains',
    EQUALS = 'equals',
    STARTS_WITH = 'startsWith',
    ENDS_WITH = 'endsWith'
}`;
    }

    ngOnInit() {
    }

}
