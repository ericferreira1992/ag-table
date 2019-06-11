import { Component, OnInit } from '@angular/core';
import { AgTableEvent } from './../../../../../../../src/models/ag-table-filter-data.model';
import { Helper } from 'src/app/core/services/helper';
import { OrderByPipe } from 'src/app/core/pipes/order-by.pipe';

@Component({
    selector: 'app-server-side-infinity',
    templateUrl: './server-side-infinity.component.html',
    styleUrls: ['./server-side-infinity.component.scss']
})
export class ServerSideInfinityComponent implements OnInit {

    private allDataTeste: any[] = [];
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

        this.testes = [];
        this.dataAreOver = false;
        this.dataLength = 0;
        this.allDataTeste = Array.from({ length: 100 }).map((x, i) => {
            let number = i + 1;
            if (type < 3)
                type++;
            else
                type = 1;

            date = this.helper.setDaysToDate(date, -1);
            return { id: `${number}`, name: `Teste ${number}`, dateRef: this.helper.toAmericanDate(date), type: `Tipo ${type}`, height: Math.floor(Math.random() * 100) };
        });
    }

    getData(event: AgTableEvent) {
        if (!this.loading) {
            if (!this.dataAreOver || event.resetData) {
                this.loading = true;
                if (event.resetData)
                    this.testes = [];
                setTimeout(() => {
                    let _testes = this.allDataTeste.filter(x => {
                        let ok = true;
                        for (let field in event.filters) {
                            let filterValue = event.filters[field];
                            if (filterValue) {
                                filterValue = (filterValue.toString() as string).toUpperCase();
                                ok = x[field] && (x[field].toString() as string).toUpperCase().includes(filterValue);
                            }

                            if (!ok)
                                break;
                        }

                        return ok;
                    });
                    this.dataLength = _testes.length;

                    if (event.order)
                        _testes = new OrderByPipe().transform(_testes, event.order.field, event.order.asc);

                    let begin = (event.page - 1) * event.pageSize;
                    let end = begin + event.pageSize;

                    _testes = _testes.slice(begin, end);

                    this.dataAreOver = !_testes.length;

                    this.testes = [...this.testes, ..._testes];

                    this.loading = false;
                }, 1500);
            }
        }
    }

}
