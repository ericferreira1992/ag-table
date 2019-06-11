import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/core/services/helper';

@Component({
    selector: 'app-client-side',
    templateUrl: './client-side.component.html',
    styleUrls: ['./client-side.component.scss']
})
export class ClientSideComponent implements OnInit {

    public testes: any[] = [];

    public types = [
        'Tipo 1',
        'Tipo 2',
        'Tipo 3',
    ];
    public dataAreOver: boolean = false;
    public dataLength: number = 0;
    public loading: boolean = false;

    constructor(
        private helper: Helper
    ) {
        this.prepareExampleData();
    }

    ngOnInit() {}

    prepareExampleData() {
        let type = 1;
        let date = new Date();

        this.testes = Array.from({ length: 10000 }).map((x, i) => {
            let number = i + 1;
            if (type < 3)
                type++;
            else
                type = 1;

            date = this.helper.setDaysToDate(date, -1);
            return { id: `${number}`, name: `Teste ${number}`, dateRef: this.helper.toAmericanDate(date), type: `Tipo ${type}`, height: Math.floor(Math.random() * 100) };
        });
    }
}
