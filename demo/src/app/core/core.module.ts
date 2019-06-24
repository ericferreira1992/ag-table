import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './pipes/order-by.pipe';
import { Helper } from './services/helper';
import { RouterOutletDefaultComponent } from './components/router-outlet-default/router-outlet-default.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SideLeftBarComponent } from './components/side-left-bar/side-left-bar.component';
import { DataFactory } from './services/data.factory';

@NgModule({
    declarations: [
        OrderByPipe,
        RouterOutletDefaultComponent,
        SideLeftBarComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        OrderByPipe,
        ReactiveFormsModule,
        SideLeftBarComponent
    ],
    providers: [
        Helper,
        DataFactory
    ]
})
export class CoreModule { }
