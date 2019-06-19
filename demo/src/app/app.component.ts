import { Component, OnInit, Renderer2, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, NavigationCancel, NavigationError, NavigationStart, Router } from '@angular/router';
import { Helper } from './core/services/helper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    public hideTitleHeader: boolean = false;
    public shadowHeader: boolean = true;

    private eventsLineters: Function[] = [];
    private get el() { return this.elRef && this.elRef.nativeElement ? this.elRef.nativeElement : null; }

	private subscriptionListenRoutes: Subscription;

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
            this.eventsLineters.push(this.renderer.listen(this.el, 'mousewheel', this.onMouseWheel.bind(this)));
            this.eventsLineters.push(this.renderer.listen(this.el, 'DOMMouseScroll', this.onMouseWheel.bind(this)));

            setTimeout(() => this.eventsLineters.push(this.renderer.listen(this.getMainContainerEl(), 'scroll', this.onMainContainerScroll.bind(this))));
        }
    }

    private getMainContainerEl() {
        let element = document.body.querySelector('.main-container');
        return element;
    }

    ngOnDestroy() {
        this.clearEventListeners();

		if (this.subscriptionListenRoutes)
			this.subscriptionListenRoutes.unsubscribe();
    }
}
