import { Component, OnInit, Renderer2, ElementRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, NavigationCancel, NavigationError, NavigationStart, Router } from '@angular/router';
import { Helper } from './core/services/helper';
import { HtmlHelper } from './core/services/html.helper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    host: {
        '(document:click)': 'onWindowClick($event)',
        '(document:keydown)': 'onWindowKeydown($event)'
    }
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('mainSectionElRef') public mainSectionElRef: ElementRef<HTMLElement>;
    @ViewChild('menuElRef') public menuElRef: ElementRef<HTMLElement>;
    @ViewChild('menuButtonElRef') public menuButtonElRef: ElementRef<HTMLElement>;

    public hideTitleHeader: boolean = false;
    public shadowHeader: boolean = true;
    public mobileScreen: boolean = false;
    public showMobileScreenMenu: boolean = false;

    private eventsLineters: Function[] = [];
    private get el() { return (this.elRef && this.elRef.nativeElement) ? this.elRef.nativeElement : null; }

    private subscriptionListenRoutes: Subscription;

    public get menuEl() { return this.menuElRef && this.menuElRef.nativeElement; }
    public get menuButtonEl() { return this.menuButtonElRef && this.menuButtonElRef.nativeElement; }
    public get mainSectionEl() { return this.mainSectionElRef && this.mainSectionElRef.nativeElement; }

    public version: string = '1.1.1';

    constructor(
        private renderer: Renderer2,
        private elRef: ElementRef<HTMLElement>,
        private helper: Helper,
		private router: Router,
    ) {
        this.listenChangeRoutes();
    }

    ngOnInit() {
        this.hideTitleHeader = this.helper.isMobileDevice();
        this.onScreenResize();
    }

    ngAfterViewInit() {
        this.executeEventListeners();
        this.checkHeaderShadow();
    }

    private checkHeaderShadow(){
        let mainContainerEl = this.getMainContainerEl();
        this.shadowHeader = mainContainerEl && mainContainerEl.scrollTop > 68;
    }

    private clearEventListeners() {
		if (this.eventsLineters && this.eventsLineters.length) {
			this.eventsLineters.forEach((eventListener) => eventListener && eventListener());
			this.eventsLineters = [];
		}
    }

    private onMouseWheel(event) {
        let mainContainerEl = this.getMainContainerEl();
        let scrollLength = mainContainerEl.scrollHeight - mainContainerEl.clientHeight;

        let down = event.type === 'DOMMouseScroll' ? (event.detail > 0) : (event.deltaY > 0);

        if ((mainContainerEl && scrollLength > 68  && scrollLength !== 0) || this.hideTitleHeader)
            this.hideTitleHeader = down;
    }

    private onMainContainerScroll() {
        this.checkHeaderShadow();
    }

    private onScreenResize() {
        let mobileScreen = window.innerWidth <= 800;

        if (mobileScreen !== this.mobileScreen) {
            this.mobileScreen = window.innerWidth <= 800;
            this.showMobileScreenMenu = !this.mobileScreen;
            this.hideTitleHeader = !this.showMobileScreenMenu;
        }
    }

    private listenChangeRoutes() {
		if (!this.subscriptionListenRoutes || this.subscriptionListenRoutes.closed)
			this.subscriptionListenRoutes = this.router.events.subscribe((event: any) => {
				if (event instanceof NavigationStart) {
				}

				if (event instanceof NavigationEnd ||
					event instanceof NavigationCancel ||
					event instanceof NavigationError) {
                        if (!this.helper.isMobileDevice())
                            this.hideTitleHeader = false;

                        this.executeEventListeners();
                        this.checkHeaderShadow();
				}

			});
    }

    private executeEventListeners() {
        if (this.el) {
            this.clearEventListeners();
            /* this.eventsLineters.push(this.renderer.listen(this.el, 'mousewheel', this.onMouseWheel.bind(this)));
            this.eventsLineters.push(this.renderer.listen(this.el, 'DOMMouseScroll', this.onMouseWheel.bind(this))); */

            setTimeout(() => this.eventsLineters.push(this.renderer.listen(this.getMainContainerEl(), 'scroll', this.onMainContainerScroll.bind(this))));
            this.eventsLineters.push(this.renderer.listen(window, 'resize', this.onScreenResize.bind(this)));
        }
    }

    private getMainContainerEl() {
        let element = document.body.querySelector('.main-container');
        return element;
    }

    public onWindowClick(event: MouseEvent) {
        if (this.menuButtonEl && !HtmlHelper.isContains(event.target, this.menuButtonEl)) {
            this.showMobileScreenMenu = false;
        }
    }

    public onWindowKeydown(event: KeyboardEvent) {
        if (event.keyCode == 27 && this.mobileScreen && this.showMobileScreenMenu) {
            this.showMobileScreenMenu = false;
        }
    }

    ngOnDestroy() {
        this.clearEventListeners();

		if (this.subscriptionListenRoutes)
			this.subscriptionListenRoutes.unsubscribe();
    }
}
