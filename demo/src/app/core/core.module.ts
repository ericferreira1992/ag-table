import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './pipes/order-by.pipe';
import { Helper } from './services/helper';
import { RouterOutletDefaultComponent } from './components/router-outlet-default/router-outlet-default.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        OrderByPipe,
        RouterOutletDefaultComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        OrderByPipe,
        ReactiveFormsModule,
    ],
    providers: [
        Helper
    ]
})
export class CoreModule { }
