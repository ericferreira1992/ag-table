import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enum-ag-table-filter-type',
  templateUrl: './enum-ag-table-filter-type.component.html',
  styleUrls: ['./enum-ag-table-filter-type.component.scss']
})
export class EnumAgTableFilterTypeComponent implements OnInit {

  public classStr: string = '';

    constructor() {
        this.classStr = '' +
`export enum AgTableFilterType {
  NONE = 'none',
  TEXT = 'text',
  SELECT = 'select',
}`;
    }

  ngOnInit() {
  }

}
