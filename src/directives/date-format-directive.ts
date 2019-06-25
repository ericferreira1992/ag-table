import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Helper } from '../services/helper';
import { AgTableSettings } from '../ag-table.settings';
import { AbstractControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Directive({
    selector: '[date-format]'
})

export class DateFormatDirective implements OnInit {
    private regex: RegExp;
    private keyCodesAccepts: number[] = [8, 9, 37, 38, 39, 40];

    private datePipe: DatePipe;

    private dateSeparator: string;

    private ctrlDown: boolean = false;
    private pasting: boolean = false;

    @Input('date-format') dateFormat: string;
    @Input('control') formControl: AbstractControl;

    constructor(
        private helper: Helper,
        private settings: AgTableSettings
    ) {
        this.datePipe = new DatePipe(settings.lang);
    }

    ngOnInit() {
        let regexStr = '^\\d';
        if (this.dateFormat) {
            if (!this.dateFormat.includes('-') && !this.dateFormat.includes('/')) {
                if (this.dateFormat.toLowerCase() === 'dd')
                    regexStr += '(0[1-9]|[12][0-9]|3[01])$';
                else if (this.dateFormat.toLowerCase() === 'mm')
                    regexStr += '(0[1-9]|1[012])$';
                else if (this.dateFormat.toLowerCase() === 'yyyy')
                    regexStr += '{4}$';
            }
            else if (this.dateFormat.includes('-') || this.dateFormat.includes('/')) {
                this.dateSeparator = this.dateFormat.includes('-') ? '-' : '/';
                let splitted = this.dateFormat.split(this.dateSeparator);
                splitted.forEach((division, i) => {
                    let divisionRegex = '';
                    if (division.toLowerCase() === 'dd')
                        divisionRegex = '(0[1-9]|[12][0-9]|3[01])';
                    else if (division.toLowerCase() === 'mm')
                        divisionRegex = '(0[1-9]|1[012])';
                    else if (division.toLowerCase() === 'yyyy')
                        divisionRegex = '{4}';
    
                    if (divisionRegex)
                        regexStr += (regexStr !== '^\\d' ? this.dateSeparator : '') + divisionRegex;
                });
                regexStr += '$';
            }
        }
        
        if (regexStr === '^\\d') {
            this.dateSeparator = '/';
            this.dateFormat = 'dd/MM/yyyy';
            regexStr = '^\\d{4}/(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])$';
        }

        this.regex = new RegExp(regexStr, 'g');
    }

    @HostListener('keydown', ['$event'])
    onKeydown(e: any) {
        let input = e.target as HTMLInputElement;

        let code = e.keyCode;
        let key = e.key.toLowerCase();

        if (code == 17 || code == 91)
            this.ctrlDown = true;
        
        if (this.keyCodesAccepts.some(x => x === code) || (this.ctrlDown && (code == 86 || code == 67 || key === 'a' || key === 'x'))) {
            if ((this.ctrlDown && key === 'x') || code === 8) {
                if ((input.selectionStart === 0 && input.selectionEnd === input.value.length) || input.value.length === 1)
                    setTimeout(() => this.onBlur(e));
            }
        }
        else {
            let object = this.generateValue(input.value, e.key);
            if (!isNullOrUndefined(object.validValue.match(this.regex))) {
                input.value = object.formatedValue;

                if (input.value.length === this.dateFormat.length)
                    this.onBlur(e);
            }
            
            event.preventDefault();
            return false;
        }
    }

    @HostListener('keyup', ['$event'])
    onKeyup(e: any) {
        if (e.keyCode == 17 || e.keyCode == 91)
            this.ctrlDown = false;
    }

    @HostListener('paste', ['$event'])
    onPaste(e: any) {
        if (!this.pasting) {
            let input = e.target as HTMLInputElement;
            let prevValue = input.value;
    
            this.pasting = true;
            setTimeout(() => {
                this.pasting = false;
                let value = this.helper.onlyNumbers(input.value, [this.dateFormat]);
                let object = this.generateValue(value);
                if (!isNullOrUndefined(object.validValue.match(this.regex))) {
                    input.value = object.formatedValue;

                    if (input.value.length === this.dateFormat.length)
                        this.onBlur(e);
                }
                else
                    input.value = prevValue;
            });
        }
    }

    @HostListener('cut', ['$event'])
    onCut(e: any) {
        if (!this.pasting) {
            let input = e.target as HTMLInputElement;
    
            this.pasting = true;
            setTimeout(() => {
                this.pasting = false;
                let value = this.helper.onlyNumbers(input.value, [this.dateFormat]);
                let object = this.generateValue(value);
                if (!isNullOrUndefined(object.validValue.match(this.regex))) {
                    input.value = object.formatedValue;
                }
                else
                    input.value = '';

                this.onBlur(e);
            });
        }
    }

    @HostListener('blur', ['$event'])
    onBlur(e: any) {
        if (this.formControl) {
            let input = e.target as HTMLInputElement;
            this.formControl.setValue(input.value);
        }
    }

    private generateValue(currentValue: string, nextChar: string = null): { validValue: string, formatedValue: string } {
        let object = {
            validValue: currentValue,
            formatedValue: '',
        };
        if (currentValue.length !== this.dateFormat.length) {
            let newValue = '';
            if (this.dateSeparator) {
                for(var i = 0; i < this.dateFormat.length; i++) {
                    let format = this.dateFormat[i];
                    let length = i + 1;
    
                    if (length <= currentValue.length)
                        newValue += currentValue[i];
                    else if ((length - 1) === currentValue.length) {
                        if (format === this.dateSeparator) {
                            newValue += format;
                            if (nextChar) i++;
                        }

                        newValue += nextChar ? nextChar : '1';

                        object.formatedValue = newValue;
                    }
                    else
                        newValue += (format !== this.dateSeparator) ? '1' : format;
                }
            }
            else {
                
            }

            object.validValue = newValue;
        }
        
        if (!object.formatedValue)
            object.formatedValue = object.validValue;

        return object;
    }

    maskDate(value: string) {
    }
}
