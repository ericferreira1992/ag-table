import { Component, OnInit } from '@angular/core';
import { Helper } from './../../../../../core/services/helper';

@Component({
    selector: 'app-others-custom-filter',
    templateUrl: './others-custom-filter.component.html',
    styleUrls: ['./others-custom-filter.component.scss']
})
export class OthersCustomFilterComponent implements OnInit {

    public dataItems: any[] = [];

    public strHtml: string;
    constructor(
        private helper: Helper
    ) {
        this.prepareExampleData();
    }

    ngOnInit() {
        this.strHtml = '' +
`<ag-table #table paginate="1000" [items]="dataItems" clickable height="500px">
    <ag-table-header #header>
        <ag-table-col filter field="id" placeholder="Identifier" width="100px">
            ID
        </ag-table-col>
        <ag-table-col filter field="name" placeholder="Set a name">
            Name
        </ag-table-col>
        <ag-table-col custom-filter="dateRef" width="200px">
            Date
            <input *ngIf="header.filterCtrls.dateRef" class="ag-table-filter-input" [formControl]="header.filterCtrls.dateRef" placeholder="yyyy/mm/dd"/>
        </ag-table-col>
        <ag-table-col custom-filter="type" width="150px">
            Type
            <select *ngIf="header.filterCtrls.type" class="ag-table-filter-select" [formControl]="header.filterCtrls.type">
                <option [value]="null">All</option>
                <option [value]="'Type 1'">Type 1</option>
                <option [value]="'Type 1'">Type 2</option>
            </select>
        </ag-table-col>
    </ag-table-header>
    <ag-table-body>
        <ag-table-row *ngFor="let item of table.items">
            <ag-table-cell>{{item.id}}</ag-table-cell>
            <ag-table-cell [style.height.px]="item.height">
                {{item.name}}
            </ag-table-cell>
            <ag-table-cell>{{item.dateRef | date:'yyyy/MM/dd'}}</ag-table-cell>
            <ag-table-cell>{{item.type}}</ag-table-cell>
        </ag-table-row>
    </ag-table-body>
</ag-table>`;
    }

    prepareExampleData() {
        let type = 1;
        let date = new Date();

        this.dataItems = Array.from({ length: 10000 }).map((x, i) => {
            let number = i + 1;
            if (type < 3)
                type++;
            else
                type = 1;

            date = this.helper.setDaysToDate(date, -1);
            return { id: `${number}`, name: `Teste ${number}`, dateRef: this.helper.toAmericanDate(date), type: `Tipo ${type}`, height: Math.floor(Math.random() * 100) };
        });
    }

}
