import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
    declarations: [
        AppComponent,
        DemoComponent,
        AboutComponent,
        ApiComponent,
        HomeComponent,
        ClientSideComponent,
        ServerSideComponent,
        ServerSideInfinityComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        AgTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
