import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../../../core/services/helper';
import { AgTableDataRenderEvent } from 'ag-table';

@Component({
    selector: 'app-others-data-render-event',
    templateUrl: './others-data-render-event.component.html',
    styleUrls: ['./others-data-render-event.component.scss']
})
export class OthersDataRenderEventComponent implements OnInit {

    public dataItems: any[] = [];

    public types = [
        'Type 1',
        'Type 2',
        'Type 3',
    ];

    private initialDate = new Date();

    public strHtml: string;
    public strTs: string;

    constructor(
        private helper: Helper
    ) {
        this.prepareExampleData();
    }

    ngOnInit() {
        this.strHtml = '' +
`<ag-table #table paginate="1000" [items]="dataItems" height="500px" min-width="800px" (onDataRender)="onDataRender($event)">
    <ag-table-header #header>
        <ag-table-col filter field="id" placeholder="Identifier" width="100px">
            ID
        </ag-table-col>
        <ag-table-col filter field="name" placeholder="Set a name">
            Name
        </ag-table-col>
        <ag-table-col field="dateRef" date-format="yyyy/dd" width="200px">
            Date
        </ag-table-col>
        <ag-table-col field="type" filter="select" [options]="types" width="150px">
            Type
        </ag-table-col>
    </ag-table-header>
    <ag-table-body>
        <ag-table-row *ngFor="let item of table.items">
            <ag-table-cell>{{item.id}}</ag-table-cell>
            <ag-table-cell>
                {{item.name}}
            </ag-table-cell>
            <ag-table-cell>
                <span *ngIf="item.loading">Loading...</span>
                <span *ngIf="!item.loading">{{item.dateRef | date:'yyyy/MM/dd'}}</span>
            </ag-table-cell>
            <ag-table-cell>{{item.type}}</ag-table-cell>
        </ag-table-row>
    </ag-table-body>
</ag-table>`;

        this.strTs = '' +
`@Component({
    ...
})
export class DemoComponent {

    public dataItems: any[] = [];

    public types = [
        'Type 1',
        'Type 2',
        'Type 3',
    ];

    private initialDate = new Date();
    constructor(
        private helper: Helper
    ) {
        this.prepareExampleData();
    }

    private prepareExampleData() {
        let type = 1;
        let date = new Date();

        this.dataItems = Array.from({ length: 10000 }).map((x, i) => {
            let number = i + 1;
            if (type < 3)
                type++;
            else
                type = 1;

            return {
                id: number,
                name: \`Teste $\{number}\`,
                dateRef: null,
                type: \`Type $\{type}\`,
                height: Math.floor(Math.random() * 100)
            };
        });
    }

    public onDataRender(event: AgTableDataRenderEvent<any>) {
        event.items.forEach(item => {
            if (!item.dateRef && !item.loading) {
                item.loading = true;
                let time = this.helper.randomInterval(1000, 2500);
                setTimeout(() => {
                    this.initialDate = this.helper.setDaysToDate(this.initialDate, -1);
                    item.dateRef = this.helper.toAmericanDate(this.initialDate);
                    item.loading = false;
                }, time);
            }
        });
    }

}`;
    }

    private prepareExampleData() {
        let type = 1;
        let date = new Date();

        this.dataItems = Array.from({ length: 10000 }).map((x, i) => {
            let number = i + 1;
            if (type < 3)
                type++;
            else
                type = 1;

            return {
                id: `${number}`,
                name: `Teste ${number}`,
                dateRef: null,
                type: `Type ${type}`,
                height: Math.floor(Math.random() * 100)
            };
        });
    }

    public onDataRender(event: AgTableDataRenderEvent<any>) {
        event.items.forEach(item => {
            if (!item.dateRef && !item.loading) {
                item.loading = true;
                let time = this.helper.randomInterval(1000, 2500);
                setTimeout(() => {
                    this.initialDate = this.helper.setDaysToDate(this.initialDate, -1);
                    item.dateRef = this.helper.toAmericanDate(this.initialDate);
                    item.loading = false;
                }, time);
            }
        });
    }

}
