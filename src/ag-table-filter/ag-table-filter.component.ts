import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges, OnDestroy, HostBinding } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { isArray, isNullOrUndefined, isObject } from 'util';
import { debounceTime, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AgTableFilterType } from '../enums/ag-table-filter-type.enum';
import { FILTER_TYPES } from '../constants/filter-types.const';
import { Helper } from '../services/helper';

@Component({
    selector: 'ag-table-filter',
    templateUrl: './ag-table-filter.component.html'
})
export class AgTableFilterComponent implements OnInit, OnChanges, OnDestroy {
    @HostBinding('class.ag-table-filter') public class: boolean = true;

    public currentFilter: any = '';
    @Input() public type = '';
    @Input() public placeholder = '';
    @Input() public readOnly: boolean = false;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public dateFormat: string = 'dd/mm/yyyy';
    @Input() public dateSeparator: string = '/';
    @Input() public optionAllLabel: string = 'Todos';
    @Input() public options: { text: string, value: any }[] | any[] = [];
    @Input() public frmControl: FormControl;

    @Output() public onChange = new EventEmitter<any>();
    @Output() public onRender = new EventEmitter<void>();

    private subscription: Subscription;
    public formFilter: FormGroup;
    public selectAllOptionValue: any = null;

    private get debounceTime(): number {
        if (this.type === 'date' || this.type === 'select')
            return 0;
        else
            return 500;
    }

    constructor(
        private helper: Helper
    ) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.onRender.emit();
        });
    }

    ngOnChanges(changes: SimpleChanges) {

        if ('options' in changes) {
            if (!isArray(this.options)) {
                console.warn('The options of a filter of type "select" was set invalid.');
                this.options = [];
            }
            else if (this.options.length) {
                if (!isObject(this.options[0])) {
                    this.options = (this.options as any).map((x) => {
                        return {
                            text: x,
                            value: x
                        };
                    });
                } else {
                    this.options = (this.options as any).map((x) => {
                        return {
                            text: ('text' in x) ? x.text : x.value,
                            value: ('id' in x) ? x.id : x.value
                        };
                    });
                }
            }
        }

        if ('type' in changes) {
            if (FILTER_TYPES.every(x => x !== this.type))
                this.type = AgTableFilterType.TEXT;
        }
        
        if ('placeholder' in changes) {
            if (!this.placeholder && this.type === 'date')
                this.placeholder = this.dateFormat.replace(/y/g, 'a');
        }

        if ('frmControl' in changes) {
            if (this.subscription)
                this.subscription.unsubscribe();

            if (this.frmControl) {
                this.currentFilter = this.frmControl.value;
                this.subscription = this.frmControl.valueChanges.pipe(
                    debounceTime(this.debounceTime),
                    map(this.prepareData.bind(this))
                ).subscribe((toFilter) => {
                    if (toFilter && this.frmControl.enable)
                        this.onChange.emit(this.currentFilter);
                });
            }
            else
                this.currentFilter = null;
        }
    }

    prepareData() {
        if (this.frmControl.disabled) {
            this.frmControl.disable();
            return false;
        }

        if (this.type === 'select') {
            if (this.frmControl.value === 'undefined' || this.frmControl.value === 'null') {
                this.currentFilter = this.selectAllOptionValue;
                this.frmControl.setValue(this.currentFilter);
                return true;
            }
        }

        if (this.frmControl.value !== this.currentFilter) {
            if (this.type === 'date') {
                if (this.frmControl.value && !this.helper.dateIsValid(this.frmControl.value)) {
                    this.currentFilter = this.selectAllOptionValue;
                    this.frmControl.setValue(null);
                    return false;
                }

                this.dateFormat = this.dateFormat.replace(new RegExp('/', 'g'), this.dateSeparator).substr(0, 10);
            }

            this.currentFilter = this.frmControl.value;

            if (typeof this.currentFilter === 'string' && this.currentFilter !== '') {
                if (this.currentFilter === 'null') {
                    this.currentFilter = null;
                    this.frmControl.setValue(this.currentFilter);
                }
                else if (this.currentFilter === 'undefined') {
                    this.currentFilter = undefined;
                    this.frmControl.setValue(this.currentFilter);
                }
                else if (this.helper.onlyNumbers(this.currentFilter) === this.currentFilter) {
                    this.currentFilter = parseInt(this.currentFilter);
                    this.frmControl.setValue(this.currentFilter);
                }
            }
        }
        else
            return false;

        return true;
    }

    private isEmptyValue(value: any) {
        return isNullOrUndefined(value) || value.toString() === '';
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}
