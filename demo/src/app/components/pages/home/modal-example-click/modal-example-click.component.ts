import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-example-click',
    templateUrl: './modal-example-click.component.html',
    styleUrls: ['./modal-example-click.component.scss']
})
export class ModalExampleClickComponent implements OnInit {

    public item: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data
    ) {
        this.item = data.item;
    }

    ngOnInit() {
    }

}
