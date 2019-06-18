import { Injectable } from '@angular/core';
import { AgTableCustomSettings } from './ag-table-custom.settings';

@Injectable({
    providedIn: 'root'
})
export class AgTableSettings {

    public lang: string = 'en-US';

    constructor(private customSettings: AgTableCustomSettings) {
        Object.assign(this, this.customSettings);
    }
}
