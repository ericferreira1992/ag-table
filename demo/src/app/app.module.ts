import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgTableModule } from './../../../src/public_api';
import { DemoComponent } from './components/pages/demo/demo.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ApiComponent } from './components/pages/api/api.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CoreModule } from './core/core.module';
import { ClientSideComponent } from './components/pages/demo/client-side/client-side.component';
import { ServerSideComponent } from './components/pages/demo/server-side/server-side.component';
import { ServerSideInfinityComponent } from './components/pages/demo/server-side-infinity/server-side-infinity.component';

import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { StructureAgTableComponent } from './components/pages/api/structure/structure-ag-table/structure-ag-table.component';
import { StructureAgTableBodyComponent } from './components/pages/api/structure/structure-ag-table-body/structure-ag-table-body.component';
import { StructureAgTableHeaderComponent } from './components/pages/api/structure/structure-ag-table-header/structure-ag-table-header.component';

export function hljsLanguages() {
    return [
        { name: 'typescript', func: typescript },
        { name: 'scss', func: scss },
        { name: 'xml', func: xml }
    ];
}

@NgModule({
    declarations: [
        AppComponent,
        DemoComponent,
        AboutComponent,
        ApiComponent,
        HomeComponent,
        ClientSideComponent,
        ServerSideComponent,
        ServerSideInfinityComponent,
        StructureAgTableComponent,
        StructureAgTableBodyComponent,
        StructureAgTableHeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HighlightModule.forRoot({
            languages: hljsLanguages
        }),
        AppRoutingModule,
        CoreModule,
        MatTabsModule,
        AgTableModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
