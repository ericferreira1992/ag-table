import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/core/services/helper';

@Component({
    selector: 'app-client-side',
    templateUrl: './client-side.component.html',
    styleUrls: ['./client-side.component.scss']
})
export class ClientSideComponent implements OnInit {

    public dataItems: any[] = [];

    public types = [
        'Tipo 1',
        'Tipo 2',
        'Tipo 3',
    ];

    public strHtml: string;
    constructor(
        private helper: Helper
    ) {
        this.prepareExampleData();
    }

    ngOnInit() {
        this.strHtml = '' +
`<ag-table #table paginate="1000" [items]="dataItems" clickable height="500px" min-width="800px">
    <ag-table-header>
        <ag-table-col filter field="id" placeholder="Identifier" width="100px">
            ID
        </ag-table-col>
        <ag-table-col filter field="name" placeholder="Set a name">
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
        <ag-table-row *ngFor="let item of table.items">
            <ag-table-cell>{{item.id}}</ag-table-cell>
            <ag-table-cell [style.height.px]="item.height">
                {{item.name}}
            </ag-table-cell>
            <ag-table-cell>{{item.dateRef | date:'dd/MM/yyyy'}}</ag-table-cell>
            <ag-table-cell>{{item.type}}</ag-table-cell>
        </ag-table-row>
    </ag-table-body>
</ag-table>
`;
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
