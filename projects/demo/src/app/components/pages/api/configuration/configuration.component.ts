import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

    public classCode = '' +
`abstract class AgTableSettingsAbstract {
    public lang: string = 'en-US';
    public filterDebounceTime: number = 500;
}`;

    public customCode = '' +
`import { AgTableModule, AgTableCustomSettings } from 'ag-table';

@NgModule({
    declarations: [...],
    imports: [
        ...,
        AgTableModule
    ],
    providers: [
        {
            provide: AgTableCustomSettings,
            useValue: {
                filterDebounceTime: 1000,
                lang: 'pt-BR'
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }`;

    constructor() {
    }

    ngOnInit() {
    }

}
