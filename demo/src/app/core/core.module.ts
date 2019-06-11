import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './pipes/order-by.pipe';
import { Helper } from './services/helper';

@NgModule({
    declarations: [
        OrderByPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OrderByPipe
    ],
    providers: [
        Helper
    ]
})
export class CoreModule { }
