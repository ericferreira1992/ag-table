import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

    public menuItems: any[] = [];

    constructor() {
        this.prepareMenu();
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
                    menu: [
                        {
                            title: 'ag-table',
                            subtitle: 'AgTable',
                            route: '/ag-table',
                        },
                        {
                            title: 'ag-table-header',
                            subtitle: 'AgTableHeader',
                            route: '/ag-table-header',
                        },
                        {
                            title: 'ag-table-col',
                            subtitle: 'AgTableCol',
                            route: '/ag-table-col',
                        },
                        {
                            title: 'ag-table-body',
                            subtitle: 'AgTableBody',
                            route: '/ag-table-body',
                        },
                        {
                            title: 'ag-table-row',
                            subtitle: 'AgTableRow',
                            route: '/ag-table-row',
                        },
                        {
                            title: 'ag-table-cell',
                            subtitle: 'AgTableCell',
                            route: '/ag-table-cell',
                        }
                    ]
                }
            },
            {
                title: 'Teste',
                subtitle: '',
                submenu: {

                }
            },
        ];
    }

    public onMenuClick(menu: any) {
        if (!menu.route && menu.submenu && menu.submenu.menu && menu.submenu.menu.length) {
            menu.submenu.visible = !menu.submenu.visible;
        }
    }

}
