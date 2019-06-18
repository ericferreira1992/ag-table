import { Component, OnInit, ViewChild, ElementRef, forwardRef, Inject } from '@angular/core';
import { Helper } from '../../../core/services/helper';
import { HtmlHelper } from '../../../core/services/html.helper';
import { AppComponent } from 'src/app/app.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('mainContainer') private mainContainer: ElementRef<HTMLElement>;

	public dataItems: any[] = [];

    public types = [
        'Tipo 1',
        'Tipo 2',
        'Tipo 3',
    ];

	public importModule: string;
	public customLangModule: string;
	public importScss1: string;
	public importScss2: string;
	public simpleExampleHtml: string;

	constructor(
        @Inject(forwardRef(() => AppComponent)) private parent: AppComponent,
		private helper: Helper
	) {
		this.importModule = '' +
`import { AgTableModule } from 'ag-table';

@NgModule({
    declarations: [...],
    imports: [
    	...,
    	AgTableModule
    ],
    providers: [...],
    bootstrap: [AppComponent]
})
export class AppModule { }`;

this.customLangModule = '' +
`import { AgTableModule, AgTableCustomSettings } from 'ag-table';

@NgModule({
    declarations: [...],
    imports: [...],
    providers: [
        { 
            provide: AgTableCustomSettings,
            useValue: { lang: 'pt-BR' } // Default is 'en-US'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }`;

		this.importScss1 = '' +
`@import '~ag-table/scss/style.scss';
@include ag-table-core();`;

		this.importScss2 = '' +
`@import '~ag-table/scss/style.scss';
@include ag-table-core($yourColor);`;

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
            <ag-table-cell>
                {{item.id}}
            </ag-table-cell>
            <ag-table-cell>
                {{item.name}}
            </ag-table-cell>
            <ag-table-cell>
                {{item.dateRef | date:'yyyy/MM/dd'}}
            </ag-table-cell>
            <ag-table-cell>
                {{item.type}}
            </ag-table-cell>
        </ag-table-row>
    </ag-table-body>
</ag-table>`;
	}

	ngOnInit() {
        this.prepareExampleData();
	}

	private prepareExampleData() {
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

    public goToGetStarted(getStartedEl: HTMLElement) {
        if (getStartedEl && this.mainContainer.nativeElement) {
            const top = getStartedEl.offsetTop + 20;
            HtmlHelper.smoothScroll(this.mainContainer.nativeElement, top);
            setTimeout(() => this.parent.hideTitleHeader = true, 200);
        }
    }

}
