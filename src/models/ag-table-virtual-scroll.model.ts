import { ElementRef } from '@angular/core';

export class AgTableVirtualScrollModel {
    public currentStartIndex: number = 0;
    public currentEndIndex: number = 0;
    public totalHeightContent: number = 0;
    public paddingScroll: number = 0;
    public previousItemsHeight: number[] = [];
    public containerSrollEl: ElementRef<HTMLElement>;

    public get currentSrollTop(): number { return (this.containerSrollEl && this.containerSrollEl.nativeElement) ? this.containerSrollEl.nativeElement.scrollTop : 0; }
	public get scrollHeight(): number { return (this.containerSrollEl && this.containerSrollEl.nativeElement) ? this.containerSrollEl.nativeElement.scrollHeight : 0; }
	public get height(): number { return (this.containerSrollEl && this.containerSrollEl.nativeElement) ? this.containerSrollEl.nativeElement.clientHeight : 0; }

    constructor(obj?: Partial<AgTableVirtualScrollModel>) {
        if (obj) Object.assign(this, obj);
    }
}
