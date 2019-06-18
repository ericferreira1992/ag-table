import { Component, OnInit, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, NavigationCancel, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public hideTitleHeader: boolean = false;

    private eventsLineters: Function[] = [];
    private get el() { return this.elRef && this.elRef.nativeElement ? this.elRef.nativeElement : null; }
    
	private subscriptionListenRoutes: Subscription;

    constructor(
        private renderer: Renderer2,
        private elRef: ElementRef<HTMLElement>,
		private router: Router,
    ) {
        this.listenChangeRoutes();
    }

    ngOnInit() {
        if (this.el) {
            this.clearEventListeners();
            this.eventsLineters.push(this.renderer.listen(this.el, 'mousewheel', this.onMouseWheel.bind(this)));
            this.eventsLineters.push(this.renderer.listen(this.el, 'DOMMouseScroll', this.onMouseWheel.bind(this)));
        }
    }

    private clearEventListeners() {
		if (this.eventsLineters && this.eventsLineters.length) {
			this.eventsLineters.forEach((eventListener) => eventListener && eventListener());
			this.eventsLineters = [];
		}
    }

    private onMouseWheel(event) {
        this.hideTitleHeader = event.type === 'DOMMouseScroll' ? (event.detail > 0) : (event.deltaY > 0);
    }

    private listenChangeRoutes() {
		if (!this.subscriptionListenRoutes || this.subscriptionListenRoutes.closed)
			this.subscriptionListenRoutes = this.router.events.subscribe((event: any) => {
				if (event instanceof NavigationStart) {
				}

				if (event instanceof NavigationEnd ||
					event instanceof NavigationCancel ||
					event instanceof NavigationError) {
                        this.hideTitleHeader = false;
				}

			});
	}

    ngOnDestroy() {
        this.clearEventListeners();
        
		if (this.subscriptionListenRoutes)
			this.subscriptionListenRoutes.unsubscribe();
    }
}
