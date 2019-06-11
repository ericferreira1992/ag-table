import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgTableComponent } from './ag-table/ag-table.component';
import { AgTableBodyComponent } from './ag-table-body/ag-table-body.component';
import { AgTableRowComponent } from './ag-table-row/ag-table-row.component';
import { AgTableHeaderComponent } from './ag-table-header/ag-table-header.component';
import { AgTableCellComponent } from './ag-table-cell/ag-table-cell.component';
import { AgTableColComponent } from './ag-table-col/ag-table-col.component';
import { AgTablePaginateComponent } from './ag-table-paginate/ag-table-paginate.component';
import { AgTableFilterComponent } from './ag-table-filter/ag-table-filter.component';
import { AgTablePrepareService } from './services/ag-table-prepare.service';
import { AgTableVirtualScrollService } from './services/ag-table-virtual-scroll.service';
import { Helper } from './services/helper';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		AgTableComponent,
		AgTableHeaderComponent,
		AgTableBodyComponent,
		AgTableRowComponent,
		AgTableCellComponent,
		AgTableColComponent,
		AgTableFilterComponent,
		AgTablePaginateComponent
	],
	exports: [
		AgTableComponent,
		AgTableHeaderComponent,
		AgTableBodyComponent,
		AgTableRowComponent,
		AgTableCellComponent,
		AgTableColComponent
	],
	bootstrap: [
	],
	providers: [
		AgTablePrepareService,
		AgTableVirtualScrollService,
		Helper
	],
	entryComponents: [
	]
})

@Injectable()
export class AgTableModule { }
