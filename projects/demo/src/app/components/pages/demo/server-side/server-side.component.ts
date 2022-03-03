import { Component, OnInit } from '@angular/core';
import { AgTableEvent } from 'ag-table';
import { Helper } from '../../../../core/services/helper';
import { OrderByPipe } from '../../../../core/pipes/order-by.pipe';

@Component({
    selector: 'app-server-side',
    templateUrl: './server-side.component.html',
    styleUrls: ['./server-side.component.scss']
})
export class ServerSideComponent implements OnInit {

    private allDataItems: any[] = [];
    public dataItems: any[] = [];

    public types = [
        'Type 1',
        'Type 2',
        'Type 3',
    ];
    public dataAreOver: boolean = false;
    public dataLength: number = 0;
    public loading: boolean = false;

    public strHtml: string;
    public strTs: string;

    constructor(
        private helper: Helper
    ) {
        this.prepareExampleData();
        this.getData();
    }

    ngOnInit() {
        this.strHtml = '' +
`<ag-table #table
    paginate="25"
    height="450px"
    min-width="800px"
    server-side
    [items]="dataItems"
    [data-length]="dataLength"
    [loading]="loading"
    (onGetData)="getData($event)"
>
    <ag-table-header>
        <ag-table-col filter="text" field="id" placeholder="Identifier" width="100px">
            ID
        </ag-table-col>
        <ag-table-col filter="text" field="name" placeholder="Set a name">
            Name
        </ag-table-col>
        <ag-table-col filter="date" field="dateRef" width="200px">
            Date
        </ag-table-col>
        <ag-table-col filter="select" field="type" [options]="types" width="150px">
        Type
        </ag-table-col>
    </ag-table-header>
    <ag-table-body>
        <ag-table-row *ngFor="let teste of table.items">
            <ag-table-cell>{{teste.id}}</ag-table-cell>
            <ag-table-cell>
                {{teste.name}}
            </ag-table-cell>
            <ag-table-cell>{{teste.dateRef | date:'yyyy/MM/dd'}}</ag-table-cell>
            <ag-table-cell>{{teste.type}}</ag-table-cell>
        </ag-table-row>
    </ag-table-body>
</ag-table>
`;

    this.strTs = '' +
`@Component({
    ...
})
export class DemoComponent {

    private allDataItems: any[] = [];

    public dataItems: any[] = [];

    public types = [
        'Type 1',
        'Type 2',
        'Type 3',
    ];
    public dataAreOver: boolean = false;
    public dataLength: number = 0;
    public loading: boolean = false;

    constructor(
        private helper: Helper
    ) {
        this.prepareExampleData();
        this.getData();
    }
    private prepareExampleData() {
        let type = 1;
        let date = new Date();

        this.dataItems = [];
        this.dataAreOver = false;
        this.dataLength = 0;
        this.allDataItems = Array.from({ length: 100 }).map((x, i) => {
            let number = i + 1;
            if (type < 3)
                type++;
            else
                type = 1;

            date = this.helper.setDaysToDate(date, -1);
            return {
                id: \`\${number}\`,
                name: \`Teste \${number}\`,
                dateRef: this.helper.toAmericanDate(date),
                type: \`Type \${type}\`,
                height: Math.floor(Math.random() * 100)
            };
        });
    }

    public getData(event: AgTableEvent = null) {
        if (!this.loading) {
            this.loading = true;

            if (!event)
                event = new AgTableEvent({
                    pageSize: 25,
                });

            // Here consume your REST API
            setTimeout(() => {

                let _dataItems = this.allDataItems.filter(x => {
                    let ok = true;
                    for (let field in event.filters) {
                        let filterValue = event.filters[field];
                        if (filterValue) {
                            filterValue = (filterValue.toString() as string).toUpperCase();
                            ok = x[field] && (x[field].toString() as string).toUpperCase().includes(filterValue);
                        }

                        if (!ok)
                            break;
                    }

                    return ok;
                });
                this.dataLength = _dataItems.length;

                if (event.order)
                    _dataItems = new OrderByPipe().transform(_dataItems, event.order.field, event.order.asc);

                let begin = (event.page - 1) * event.pageSize;
                let end = begin + event.pageSize;

                this.dataItems = _dataItems.slice(begin, end);

                this.loading = false;
            }, 1500);
        }
    }

}
`;
    }

    prepareExampleData() {
        let type = 1;
        let date = new Date();

        this.dataItems = [];
        this.dataAreOver = false;
        this.dataLength = 0;
        this.allDataItems = Array.from({ length: 100 }).map((x, i) => {
            let number = i + 1;
            if (type < 3)
                type++;
            else
                type = 1;

            date = this.helper.setDaysToDate(date, -1);
            return { id: `${number}`, name: `Teste ${number}`, dateRef: this.helper.toAmericanDate(date), type: `Type ${type}`, height: Math.floor(Math.random() * 100) };
        });
    }

    getData(event: AgTableEvent = null) {
        if (!this.loading) {
            this.loading = true;

            if (!event)
                event = new AgTableEvent({
                    pageSize: 25,
                });

            setTimeout(() => {

                let _dataItems = this.allDataItems.filter(item => {
                    let ok = true;
                    for (let field in event.filters) {
                        let filterValue = event.filters[field];
                        if (filterValue) {
                            filterValue = (filterValue.toString() as string).toUpperCase();

                            if (field === 'dateRef')
                                ok = this.helper.dateFormat(filterValue, 'yyyy-MM-dd') === item[field];
                            else
                                ok = item[field] && (item[field].toString() as string).toUpperCase().includes(filterValue);
                        }

                        if (!ok)
                            break;
                    }

                    return ok;
                });
                this.dataLength = _dataItems.length;

                if (event.order)
                    _dataItems = new OrderByPipe().transform(_dataItems, event.order.field, event.order.asc);

                let begin = (event.page - 1) * event.pageSize;
                let end = begin + event.pageSize;

                this.dataItems = _dataItems.slice(begin, end);

                this.loading = false;
            }, 1500);
        }
    }

}
