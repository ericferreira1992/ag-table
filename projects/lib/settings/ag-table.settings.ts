import { Injectable } from '@angular/core';
import { AgTableCustomSettings } from './ag-table-custom.settings';
import { AgTableSettingsAbstract } from './ag-table-settings.abstract';

@Injectable({
    providedIn: 'root'
})
export class AgTableSettings extends AgTableSettingsAbstract {

    constructor(customSettings: AgTableCustomSettings) {
        super();
        if (customSettings)
            Object.assign(this, customSettings);
    }
}
