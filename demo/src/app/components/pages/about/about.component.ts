import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    public changeLogs: { version: string, descriptions: string[] }[] = [];
    public contributors: { name: string, github: string }[] = [];

    constructor() {
        this.buildChangeLogs();
        this.setContributors();
    }

    private buildChangeLogs() {
        this.changeLogs = [
            {
                version: '1.1.0',
                descriptions: [ 'The <strong>min-width</strong> directive was not working correctly.' ]
            },
            {
                version: '1.0.6, 1.0.7, 1.0.8 and 1.0.9',
                descriptions: [
                    'Added <strong>min-with</strong> directive.',
                    'Bug fixes. 😁'
                ]
            },
            {
                version: '1.0.5',
                descriptions: [
                    'Attempt of stay on the same page if the data (items) changes.',
                    'Change in table width and height monitoring algorithm.',
                    'Added <strong>no-truncate</strong> directive in <strong>ag-table-cell</strong>.',
                    'Bug fixes. 😁'
                ]
            },
            {
                version: '1.0.4',
                descriptions: [
                    'Added date filter type on client-side mode',
                    'Check if the table was removed and put back into the DOM (bug found when using AgTable in the tabs component of the material).'
                ]
            },
            {
                version: '1.0.3',
                descriptions: [ 'Bug fixes. 😁' ],
            },
            {
                version: '1.0.2',
                descriptions: [ 'Bug fixes. 😁' ]
            },
            {
                version: '1.0.1',
                descriptions: [ 'AgTable is born. 😍' ]
            }
        ];
    }

    private setContributors() {
        this.contributors = [
            {
                name: 'Eric Ferreira',
                github: 'ericferreira1992'
            },
            {
                name: 'Pedro Victorino',
                github: 'pedrovsp'
            },
        ];
    }

    ngOnInit() {
    }

}
