import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { AgTableSettings } from '../settings/ag-table.settings';

@Injectable({
    providedIn: 'root'
})
export class AgTableLangService {

    private set lang(value: string) { this.settings.lang = value; }
    private get lang() { return this.settings.lang; }

    private get langTranslation() { return this.lang.replace(/-/g, '').trim(); }

    constructor(
        private settings: AgTableSettings
    ) {
    }

    public setLang(lang: string, reloadPage: boolean = false) {
        this.lang = lang;

        if (reloadPage)
            location.reload();
    }

    public getLang(): string { return this.lang; }

    public getText(value: string, dict: { [key: string]: any }, asString: boolean = true) {

        let getText = (arg?: Subscriber<string>) => {
            let observ = arg ? arg as Subscriber<string> : null;

            if (!dict || JSON.stringify(dict) !== '{}') {
                let helper = this.processValue(value, dict);

                // tslint:disable-next-line:quotemark
                if (typeof helper === "object") {
                    let text = `-- WITHOUT TRANSLATION [${value}] --`;
                    if (observ)
                        observ.next(text);
                    else
                        return text;
                }
                else {
                    if (observ)
                        observ.next(helper);
                    else
                        return helper;
                }
            }
            else {
                if (observ) {
                    if (dict && value in dict && this.langTranslation in dict[value])
                        observ.next(dict[value][this.langTranslation]);
                    else
                        observ.next('');
                }
                else {
                    if (dict && value in dict && this.langTranslation in dict[value])
                        return dict[value][this.langTranslation];
                    else
                        return '';
                }
            }

            if (observ) return () => observ.unsubscribe();
        };

        if (!asString)
            return new Observable<string>(getText);
        else
            return getText();
    }

    private processValue(prop: string, dict?: any): string {

        const positions = prop.split('.');
        let helper = null;

        if (dict && JSON.stringify(dict) !== '{}'){
            helper = dict;

            for (let _prop of positions){
                if (_prop in helper)
                    helper = helper[_prop];
            }

            if (this.langTranslation in helper)
                helper = helper[this.langTranslation];
        }

        return helper ? helper : '';
    }
}
