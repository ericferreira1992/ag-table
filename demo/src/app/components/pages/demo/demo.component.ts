import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

    public menuItems: any[] = [];

    constructor(
        @Inject(forwardRef(() => AppComponent)) public parent: AppComponent,
        private route: Router
    ) {
        this.prepareMenu();
    }

    ngOnInit() {
    }

    private prepareMenu() {
        this.menuItems = [
            {
                title: 'Client side',
                route: '/demo/client-side',
            },
            {
                title: 'Server side',
                route: '/demo/server-side',
            },
            {
                title: 'Server side infinity scroll',
                route: '/demo/server-side-infinity',
            },
            {
                title: 'Others',
                routePrefix: '/demo/others',
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
                        },
                        {
                            title: 'Using unequal row height',
                            route: '/unequal-row-height',
                        },
                    ]
                }
            }
        ];
    }
}
