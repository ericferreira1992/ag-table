import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

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
                title: 'Client side',
                route: '/client-side',
            },
            {
                title: 'Server side',
                route: '/server-side',
            },
            {
                title: 'Server side infinity scroll',
                route: '/server-side-infinity',
            },
            {
                title: 'Others',
                routePrefix: '/others',
                submenu: {
                    visible: false,
                    items: [
                        {
                            title: 'Custom filter',
                            route: '/custom-filter',
                        },
                        {
                            title: 'Using data render event',
                            route: '/using-data-render-event',
                        }
                    ]
                }
            }
        ];
    }

    private checkIsActiveMenu() {
        for (let item of this.menuItems) {
            if (item.submenu && item.submenu.items && item.submenu.items.length) {
                item.submenu.visible = item.submenu.items.some(subitem => this.route.url === '/demo' + item.routePrefix + subitem.route);
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
        else {
            for (let item of this.menuItems) {
                if (item.submenu)
                    item.submenu.visible = false;
            }
        }
    }
}
