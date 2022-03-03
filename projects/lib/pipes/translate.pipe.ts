import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { AgTableLangService } from '../services/ag-table-lang.service';
@Injectable({
    providedIn: 'root'
})
@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements PipeTransform {
    constructor(
        private langService: AgTableLangService
    ) {
    }

    transform(prop: string, dict: { [key: string]: any } = null, replaceObj?: { [key: string]: any }): any {
        let text = '';

        this.langService.getText(prop, dict, false).subscribe(result => {
            if (result !== undefined && typeof(result) === 'string') {
                if (replaceObj && (typeof replaceObj).includes('object')) {
                    for (let property in replaceObj)
                        result = result.replace(`{{${property}}}`, replaceObj[property]);
                }
                text = result;
            }
        });
        return text;
    }
}
