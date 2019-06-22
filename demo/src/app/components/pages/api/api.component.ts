import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

    public menuItems: any[] = [];

    constructor(
        @Inject(forwardRef(() => AppComponent)) private parent: AppComponent,
        private route: Router
    ) {
        this.prepareMenu();
    }

    ngOnInit() {
    }

    private prepareMenu() {
        this.menuItems = [
            {
                title: 'Structure of components',
                routePrefix: '/api/structure',
                submenu: {
                    visible: false,
                    items: [
                        {
                            title: 'ag-table',
                            route: '/ag-table',
                        },
                        {
                            title: 'ag-table-header',
                            route: '/ag-table-header',
                        },
                        {
                            title: 'ag-table-col',
                            route: '/ag-table-col',
                        },
                        {
                            title: 'ag-table-body',
                            subtitle: 'AgTableBody',
                            route: '/ag-table-body',
                        },
                        {
                            title: 'ag-table-row',
                            route: '/ag-table-row',
                        },
                        {
                            title: 'ag-table-cell',
                            route: '/ag-table-cell',
                        }
                    ]
                }
            },
            {
                title: 'Events',
                routePrefix: '/api/events',
                submenu: {
                    visible: false,
                    items: [
                        {
                            title: 'AgTableEvent',
                            route: '/ag-table',
                        },
                        {
                            title: 'AgTableDataRenderEvent<T>',
                            route: '/ag-table-data-render',
                        }
                    ]
                }
            },
            {
                title: 'Enums',
                routePrefix: '/api/enums',
                submenu: {
                    visible: false,
                    items: [
                        {
                            title: 'AgTableFilterMode',
                            route: '/ag-table-filter-mode',
                        },
                        {
                            title: 'AgTableFilterType',
                            route: '/ag-table-filter-type',
                        }
                    ]
                }
            },
        ];
    }

}
