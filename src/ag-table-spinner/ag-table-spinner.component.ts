import { Component, OnInit, HostBinding } from '@angular/core';
import { TRANSLATION } from './ag-table-spinner.component.trans';

@Component({
    selector: 'ag-table-spinner',
    templateUrl: './ag-table-spinner.component.html'
})
export class AgTableSpinnerComponent implements OnInit {
    @HostBinding('class.ag-table-spinner') private class: boolean = true;

    public dictionary = TRANSLATION;

    constructor(
    ) {
    }

    ngOnInit() {
    }
}
