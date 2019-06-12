import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../core/services/helper';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public dataItems: any[] = [];

    public types = [
        'Tipo 1',
        'Tipo 2',
        'Tipo 3',
    ];

	public importModule: string;
	public simpleExampleHtml: string;

	constructor(
		private helper: Helper
	) {
		this.importModule = '' +
`import { AgTableModule } from 'ag-virtual-scroll';

@NgModule({
    imports: [
    	...,
    	AgTableModule
    ],
    declarations: [...],
    providers: [...],
    bootstrap: [AppComponent]
})
export class AppModule { }`;

		this.simpleExampleHtml = '' +
`<ag-table #table paginate="100" [items]="dataItems" clickable height="500px">
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
			<ag-table-cell>
				{{item.name}}
			</ag-table-cell>
			<ag-table-cell>{{item.dateRef | date:'yyyy/MM/dd'}}</ag-table-cell>
			<ag-table-cell>{{item.type}}</ag-table-cell>
		</ag-table-row>
	</ag-table-body>
</ag-table>`;
	}

	ngOnInit() {
        this.prepareExampleData();
	}

	prepareExampleData() {
        let type = 1;
        let date = new Date();

        this.dataItems = Array.from({ length: 1000 }).map((x, i) => {
            let number = i + 1;
            if (type < 3)
                type++;
            else
                type = 1;

            date = this.helper.setDaysToDate(date, -1);
            return { id: `${number}`, name: `Teste ${number}`, dateRef: this.helper.toAmericanDate(date), type: `Tipo ${type}` };
        });
    }

}
