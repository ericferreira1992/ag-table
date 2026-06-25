import { Injectable } from '@angular/core';
import { Helper } from './helper';
import { AgTableBodyComponent } from '../ag-table-body/ag-table-body.component';
import { AgTableDataRenderEvent } from '../events/ag-table-data-render.event';
import { AgTableComponent } from '../ag-table/ag-table.component';

@Injectable()
export class AgTableVirtualScrollService {

	constructor(private helper: Helper) {
	}

	public defineItens(body: AgTableBodyComponent) {
		const vs = body.virtualScroll!;
		const table = body.parent;

		const dimensions = this.defineDimensions(body);

		vs.paddingScroll = dimensions.paddingTop;
		vs.totalHeightContent = dimensions.heightAllItems;
		vs.currentStartIndex = dimensions.itemsThatAreGone;
		vs.currentEndIndex = vs.currentStartIndex + this.howManyCanAppear(body);

		table.items = table.filteredItems.slice(vs.currentStartIndex, vs.currentEndIndex);
		table.onDataRender.emit(new AgTableDataRenderEvent<any>({
			items: table.items,
			length: table.items.length,
			startIndex: vs.currentStartIndex,
			endIndex: vs.currentEndIndex
		}));
		table.isDataEmpty = table.items.length === 0;
	}

	public onScrollChange(body: AgTableBodyComponent) {
		const vs = body.virtualScroll!;
		for (let i = 0; i < body.itemsContainerEl.nativeElement.children.length; i++) {
			let children = body.itemsContainerEl.nativeElement.children[i];
			let realIndex = vs.currentStartIndex + i;
			if (!vs.previousItemsHeight[realIndex])
				vs.previousItemsHeight[realIndex] = children.getBoundingClientRect().height;
		}

		this.defineItens(body);
	}

	public reset(body: AgTableBodyComponent) {
		const vs = body.virtualScroll!;
		vs.previousItemsHeight = [];
		vs.totalHeightContent = 0;
		vs.paddingScroll = 0;
	}

	defineDimensions(body: AgTableBodyComponent) {
		const vs = body.virtualScroll!;
		const rowHeight = parseInt(this.helper.onlyNumbers(body.rowHeight));

		const obj = {
			paddingTop: 0,
			itemsThatAreGone: 0,
			heightAllItems: 0
		};

		obj.heightAllItems = (body.parent as AgTableComponent).filteredItems.reduce((prev, curr, i) => {
			const height = vs.previousItemsHeight[i];
			return prev + (height ? height : rowHeight);
		}, 0);

		if (vs.currentSrollTop >= rowHeight) {
			let paddingTop = 0;
			let itemsThatAreGone = 0;
			let initialScroll = vs.currentSrollTop;

			for (let h of vs.previousItemsHeight) {
				let height = h ? h : rowHeight;
				if (initialScroll >= height) {
					paddingTop += height;
					initialScroll -= height;
					itemsThatAreGone++;
				}
				else
					break;
			}

			obj.paddingTop = paddingTop;
			obj.itemsThatAreGone = itemsThatAreGone;
		}

		return obj;
	}

	public preparePreviousItemAfterDataChange(body: AgTableBodyComponent) {
		const table = body.parent;
		const vs = body.virtualScroll!;

		if (!table.infinity)
			vs.previousItemsHeight = new Array(table.filteredItems.length).fill(null);
		else {
			let anothers = table.filteredItems.length - vs.previousItemsHeight.length;
			if (anothers > 0)
				vs.previousItemsHeight = [...vs.previousItemsHeight, ...(Array.from({ length: anothers }).fill(null))] as number[];
		}
	}

	public canApplyVirtualScroll(body: AgTableBodyComponent) {
		const vs = body.virtualScroll!;

		if (body.parent && body.parent._height !== 'auto')
			return true;
		else {
			let rowHeight = parseInt(this.helper.onlyNumbers(body.rowHeight));
			let avaiableScrollHeight = vs.scrollHeight - vs.height;

			if (avaiableScrollHeight > rowHeight)
				return (avaiableScrollHeight / rowHeight) >= 1.5;
		}

		return false;
	}

	public howManyCanAppear(body: AgTableBodyComponent) {
		const vs = body.virtualScroll!;
		const rowHeight = parseInt(this.helper.onlyNumbers(body.rowHeight));
		const height = vs.height ? vs.height : parseInt(this.helper.onlyNumbers(body.parent._height));
		return Math.floor((isNaN(height) ? 0 : height) / rowHeight) + 1;
	}
}
