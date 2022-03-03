import { isNullOrUndefined } from 'util';

export class HtmlHelper {

	/**
	 * Checa se o elemento contem dentro de outro
	*/
	public static isContains (element, parentElment): boolean{
		while (!isNullOrUndefined(element) && element.tagName.toUpperCase() !== 'BODY') {
			if (element === parentElment) {
				return true;
			}
			element = element.parentNode;
		}
		return false;
	}

	public static srollBottom(element: HTMLElement, animated: boolean = false) {
		if (element) {
			if (!animated)
				element.scrollTo(element.scrollLeft, element.scrollHeight);
			else {
				const initialScrollHeight = element.scrollHeight;
				let currentScroll = element.scrollTop;

				const loop = setInterval(() => {
					if (element.scrollHeight === initialScrollHeight) {
						currentScroll = element.scrollTop + 10;
						element.scrollTo(element.scrollLeft, currentScroll);

						if (currentScroll < initialScrollHeight)
							return;
					}
					clearInterval(loop);
				}, 20);
			}
		}
	}

	public static smoothScroll(element: HTMLElement, scroll: number = 0, duration: number = 400, direction: string = 'top') {
		let start = direction === 'top' ? element.scrollTop : element.scrollLeft;

		if (scroll < 0) scroll = 0;
		else if (scroll === null || scroll === undefined)
			scroll = direction === 'top' ? element.scrollHeight : element.scrollWidth;

		let distance = (scroll - start) - 77;

		let startTime = new Date().getTime();

		if (!duration) duration = 400;

		let easeInOutQuart = (time, from, distance, duration) => {
			if ((time /= duration / 2) < 1)
				return distance / 2 * time * time * time * time + from;
			return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
		};

		let timer = setInterval(() => {
			const time = new Date().getTime() - startTime,
			newScroll = easeInOutQuart(time, start, distance, duration);

			if (time >= duration) {
				clearInterval(timer);
				timer = null;
			}

			if (element.scrollTo) {
				if (direction === 'top')
					element.scrollTo(element.scrollLeft, newScroll);
				else
					element.scrollTo(newScroll, element.scrollTop);
			}
			else {
				if (direction === 'top')
					element.scrollTop = newScroll;
				else
					element.scrollLeft = newScroll;
			}
		}, 1000 / 60);

		return timer;
	}
}
