import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

    public menuItems: any[] = [];

    constructor(
        private route: Router
    ) {
        this.prepareMenu();
        this.checkIsActiveMenu();
    }

    ngOnInit() {
    }

    private prepareMenu() {
        this.menuItems = [
            {
                title: 'Structure of components',
                routePrefix: '/structure',
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
                routePrefix: '/events',
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
                routePrefix: '/enums',
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

    private checkIsActiveMenu() {
        for (let item of this.menuItems) {
            if (item.submenu && item.submenu.items && item.submenu.items.length) {
                item.submenu.visible = item.submenu.items.some(subitem => this.route.url === '/api' + item.routePrefix + subitem.route);
            }
        }
    }

    public onMenuClick(menu: any) {
        if (!menu.route && menu.submenu && menu.submenu.items && menu.submenu.items.length) {
            menu.submenu.visible = !menu.submenu.visible;

            if (menu.submenu.visible)
                for (let item of this.menuItems) {
                    if (menu !== item && item.submenu)
                        item.submenu.visible = false;
                }
        }
    }

}
