import { Component, OnInit, Input, HostBinding, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { HtmlHelper } from '../../services/html.helper';
import { Router } from '@angular/router';

@Component({
    selector: 'side-left-bar',
    templateUrl: './side-left-bar.component.html',
    styleUrls: ['./side-left-bar.component.scss'],
    host: {
        '(document:click)': 'onWindowClick($event)',
        '(document:keydown)': 'onWindowKeydown($event)'
    }
})
export class SideLeftBarComponent implements OnInit, OnChanges {
    @ViewChild('menuButtonElRef') private menuButtonElRef: ElementRef<HTMLElement>;
    @ViewChild('menuElRef') private menuElRef: ElementRef<HTMLElement>;

    @HostBinding('class.side-left-bar') public class: boolean = true;
    @HostBinding('class.mobile') public mobile: boolean = true;

    @Input('menu-items') public menuItems: any[] = [];
    @Input('is-mobile') public isMobile: boolean = false;
    
    private get menuButtonEl() { return this.menuButtonElRef && this.menuButtonElRef.nativeElement; }
    private get menuEl() { return this.menuElRef && this.menuElRef.nativeElement; }

    public showMobileMenu: boolean = false;

    constructor(
        private route: Router
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('isMobile' in changes) {
            this.mobile = this.isMobile;
            this.showMobileMenu = !this.mobile;
        }
        if ('menuItems' in changes) {
            this.checkIsActiveMenu();
        }
    }

    public onWindowClick(event: MouseEvent) {
        if (!HtmlHelper.isContains(event.target, this.menuButtonEl) && !HtmlHelper.isContains(event.target, this.menuEl)) {
            this.showMobileMenu = false;
            this.checkIsActiveMenu();
        }
    }

    public onWindowKeydown(event: KeyboardEvent) {
        if (event.keyCode == 27 && this.mobile && this.showMobileMenu) {
            this.showMobileMenu = false;
            this.checkIsActiveMenu();
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
            
            this.showMobileMenu = false;
        }
    }

    private checkIsActiveMenu() {
        for (let item of this.menuItems) {
            if (item.submenu && item.submenu.items && item.submenu.items.length) {
                item.submenu.visible = item.submenu.items.some(subitem => this.route.url === item.routePrefix + subitem.route);
            }
        }
    }

}
