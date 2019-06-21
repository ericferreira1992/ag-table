import { Component, OnInit, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'side-left-bar',
    templateUrl: './side-left-bar.component.html',
    styleUrls: ['./side-left-bar.component.scss']
})
export class SideLeftBarComponent implements OnInit, OnChanges {
    @HostBinding('class.side-left-bar') public class: boolean = true;
    @HostBinding('class.mobile') public mobile: boolean = true;

    @Input('menu-items') private menuItems: any[] = [];
    @Input('is-mobile') private isMobile: boolean = false;

    constructor(
        
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('isMobile' in changes) {
            this.mobile = this.isMobile;
        }
    }

}
