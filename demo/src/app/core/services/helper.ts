import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';

@Injectable()
export class Helper {
	private datePipe: DatePipe;

	constructor(
	) {
		this.datePipe = new DatePipe('en-US');
	}
	padLeft(text: string, qtty: number = 2, char: string | number = 0) {
		if (!isNullOrUndefined(text))
			while (text.length < qtty)
				text = char + text;

		return text;
	}

	padRight(text: string, qtty: number = 2, char: string | number = 0) {
		if (!isNullOrUndefined(text))
			while (text.length < qtty)
				text += char;

		return text;
	}

	randomNumber(min = 1, max = 9999) {
		let number = Math.floor(Math.random() * max);

		return Math.max(number, min);
	}

	onlyNumbers(text: string) {
		if (!isNullOrUndefined(text))
			return text.replace(/[^\d]/g, '');
		return '';
	}

	onlyAlphaNumeric(text: string) {
		if (!isNullOrUndefined(text))
			return text.replace(/[^a-zA-Z0-9]+/g, '');
		return '';
	}

	removeAccents(text: string) {
		return text ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
	}

	dateIsValid(date: string | Date): boolean {
		return !isNullOrUndefined(this.strToDate(date));
	}

	toAmericanDate(date: string | Date, separator: string = '-'): string {
		if (date instanceof Date) date = this.dateToStr(date);
		if (this.dateIsValid(date)) {
			let dateStr = date as string;
			if (dateStr && (dateStr.includes('-') || dateStr.includes('/'))) {
				if (dateStr.includes('/')) dateStr = dateStr.replace(/\//g, '-');

				const dateSplited = dateStr.split('-');
				if (dateSplited.length >= 3) {
					const year = parseInt((dateSplited[0].length === 4) ? dateSplited[0] : dateSplited[2]);
					const month = parseInt(dateSplited[1]);
					const day = parseInt((dateSplited[0].length === 4) ? dateSplited[2] : dateSplited[0]);

					const arrayDate = [year, (month > 9 ? month : ('0' + month)), (day > 9 ? day : ('0' + day))];
					return arrayDate.join(separator);
				}
			}
		}

		return date as string;
	}

	strToDate(date: string | Date): Date {
		if (typeof date === 'string' && date.length >= 8) {
			let dateStr = (date as string);
			if (dateStr && (dateStr.includes('-') || dateStr.includes('/'))) {
				if (dateStr.includes('/')) dateStr = dateStr.replace(/\//g, '-');
				dateStr = dateStr.substr(0, 10);

				const dateSplited = dateStr.split('-');
				if (dateSplited.length >= 3) {
					const year = parseInt((dateSplited[0].length === 4) ? dateSplited[0] : dateSplited[2]);
					const month = parseInt(dateSplited[1]);
					const day = parseInt((dateSplited[0].length === 4) ? dateSplited[2] : dateSplited[0]);

					const arrayDate = [year, (month > 9 ? month : ('0' + month)), (day > 9 ? day : ('0' + day))];
					dateStr = arrayDate.join('-');

					if (dateStr)
						return new Date(year, month - 1, day, 0, 0, 0);
				}
			}
		}
		else if (date instanceof Date)
			return date as Date;

		return null;
	}

	setDaysToDate(date: Date | string, days: number): Date {
		if (typeof date === 'string') date = this.strToDate(date);
		else if (date) date = this.copyDate(date);

		if (date && typeof days === 'number')
			return new Date(date.setDate(date.getDate() + days));

		return date;
	}

	dateToStr(date: Date | string, format: string = 'dd/MM/yyyy'): string {
		if (!format) format = 'dd/MM/yyyy';
		format = format.replace(/mm/g, 'MM');

		if (date) {
			if (typeof date === 'string')
				date = this.strToDate(date);

			return this.datePipe.transform(date, format);
		}

		return null;
	}

	getDateToday(withHours: boolean = false) {
		let today = new Date();
		if (withHours)
			return today;
		else
			return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
	}

	getYearOfDate(date: Date | string) {
		date = this.strToDate(date);

		if (date) return date.getFullYear();
		return 0;
	}

	getMonthOfDate(date: Date | string) {
		date = this.strToDate(date);

		if (date) return date.getMonth() + 1;
		return 0;
	}

	getDayOfDate(date: Date | string) {
		date = this.strToDate(date);

		if (date) return date.getDate();
		return 0;
	}

	copyDate(date: Date): Date {
		if (date)
			return new Date(date.toString());
		return date;
	}

	dateFormat(date: Date | string, format: string = 'dd/MM/yyyy'): string {

		date = this.strToDate(date);

		if (date) return this.datePipe.transform(date, format);

		return null;
	}

	strToDoubleCurrency(strCurrency: string): number {
		strCurrency = strCurrency.replace(/[,.]/g, (m) => m === ',' ? '.' : ',');

		return Number(strCurrency);
	}

	copy(obj: any) {
		if (obj) return JSON.parse(JSON.stringify(obj));
		else return obj;
	}

	copyToClipboard(inputElement) {
		inputElement.focus();
		inputElement.select();
		let successful = document.execCommand('copy');
	}

	getDiffOfDate(dateBegin: Date, dateEnd: Date, returnType: string = 'days'): number {
		if (dateBegin && dateEnd) {

			let delta = Math.abs(dateEnd.getTime() - dateBegin.getTime()) / 1000;

			let days = Math.floor(delta / 86400);
			delta -= days * 86400;

			let hours = Math.floor(delta / 3600) % 24;
			delta -= hours * 3600;

			let minutes = Math.floor(delta / 60) % 60;
			delta -= minutes * 60;

			let seconds = Math.floor(delta % 60);

			if (returnType === 'days')
				return days;
			else if (returnType === 'hours')
				return hours;
			else if (returnType === 'minutes')
				return minutes;
			else if (returnType === 'seconds')
				return seconds;
		}

		return 0;
	}

	public stringReplace(source, str, strToRep){
		return source.replace(str, strToRep).toString();
	}

	public  randomInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	public isMobileDevice() {
		return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	};
}
