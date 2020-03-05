import { Component, OnInit, ViewChild, ElementRef, forwardRef, Inject } from '@angular/core';
import { Helper } from '../../../core/services/helper';
import { HtmlHelper } from '../../../core/services/html.helper';
import { AppComponent } from 'src/app/app.component';
import { DataFactory } from 'src/app/core/services/data.factory';
import { MatDialog } from '@angular/material/dialog';
import { ModalExampleClickComponent } from './modal-example-click/modal-example-click.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('mainContainer', { static: false }) private mainContainerElRef: ElementRef<HTMLElement>;

    private get mainContainerEl() { return this.mainContainerElRef && this.mainContainerElRef.nativeElement; }

	public dataItems: any[] = [];

    public types = [];

	public importModule: string;
	public customLangModule: string;
	public importScss1: string;
	public importScss2: string;
	public simpleExampleHtml: string;

	constructor(
        @Inject(forwardRef(() => AppComponent)) private parent: AppComponent,
        private helper: Helper,
        private dialog: MatDialog,
        private dataFactory: DataFactory
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
`<ag-table #table paginate="100" [items]="dataItems" clickable height="500px" min-width="650px">
    <ag-table-header>
        <ag-table-col filter field="name" placeholder="Set a professional">
            Professional
        </ag-table-col>
        <ag-table-col filter="date" field="date" placeholder="Set a area" width="200px">
            Area
        </ag-table-col>
        <ag-table-col filter="select" field="profType" [options]="types" width="150px">
            Type
        </ag-table-col>
    </ag-table-header>
    <ag-table-body row-height="90px">
        <ag-table-row *ngFor="let item of table.items" (click)="onClick(item)">
            <ag-table-cell class="name">
                <img [src]="item.avatar" />
                <div>
                    <span>{{item.name}}</span><br/>
                    {{item.phone}}<br/>
                    {{item.email}}
                </div>
            </ag-table-cell>
            <ag-table-cell>
                {{item.profArea}}
            </ag-table-cell>
            <ag-table-cell>
                {{item.profType}}
            </ag-table-cell>
        </ag-table-row>
    </ag-table-body>
</ag-table>`;
	}

	ngOnInit() {
        this.prepareExampleData();
	}

	private prepareExampleData() {
        this.dataItems = Array.from({ length: 1000 }).map(() => {
            let random = this.dataFactory.getRandomObject();
            if (!this.types.some(x => x === random.profType))
                this.types.push(random.profType);
            return random;
        });
    }

    public goToGetStarted(getStartedEl: HTMLElement) {
        if (getStartedEl && this.mainContainerEl) {
            const top = getStartedEl.offsetTop + 20;

            if (this.parent.mobileScreen)
                HtmlHelper.smoothScroll(this.parent.mainSectionEl, top);
            else
                HtmlHelper.smoothScroll(this.mainContainerEl, top);

            if (!this.helper.isMobileDevice())
                setTimeout(() => this.parent.hideTitleHeader = true, 200);
        }
    }

    public onClick(item) {
        this.dialog.open(ModalExampleClickComponent, {
            data: { item }
        });
    }

}
