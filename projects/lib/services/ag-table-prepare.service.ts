import { Injectable } from '@angular/core';
import { AgTableComponent } from '../ag-table/ag-table.component';
import { AgTableFilterMode } from '../enums/ag-table-filter-mode.enum';
import { AgTableChangeAction } from '../enums/ag-table-change-action.enum';
import { Helper, isNullOrUndefined, isObject } from './helper';
import { AgTableFilterType } from '../enums/ag-table-filter-type.enum';

@Injectable()
export class AgTablePrepareService {

	constructor(private helper: Helper) {
	}

	public apply(data: any[], AgTable: AgTableComponent) {
		if (data && Array.isArray(data) && data.length) {
			if (!AgTable.serverSide) {
				let _data: any[];

				let length = data.length;
				let lengthPaginated = data.length;

				if (AgTable.isFiltering) {
					_data = this.applyFilter(data, AgTable);
					length = _data.length;
				}

				if (AgTable.isSorting) {
					_data = this.applySort(_data ? _data : data, AgTable);
					length = _data.length;
				}

				if (AgTable.isPaging) {
					_data = this.applyPaginate(_data ? _data : data, AgTable);
					lengthPaginated = _data.length;
				}

				AgTable.setDataLength(length, lengthPaginated);

				return _data ? _data : data;
			}

			return data;
		}
		else {
			if (!AgTable.serverSide)
				AgTable.setDataLength(0, 0);

			return [];
		}
	}

	private applyFilter(data: any[], table: AgTableComponent) {
		let header = table.header;
		let frm = header.frmFilter;

		if (table.actionChange === AgTableChangeAction.FILTER)
			table.setCurrentPage(1);

		let _data = data.filter((item) => {

			let ok = true;
			for (let field in frm.controls) {

				let value: any;
				if (field.includes('.')) {
					let fields = field.split('.');
					value = item[fields[0]];
					fields.slice(1).forEach(field => {
						if (isObject(value))
							value = (field in value) ? value[field] : null;
					});
				}
				else
					value = item[field];

				let filterCol = header.getColByField(field);
				let filterMode = header.getColFilterModeByField(field);

				let filterValue = frm.controls[field].value;

				if (filterCol && filterCol.filter === AgTableFilterType.DATE) {
					value = this.helper.dateFormat(value, filterCol.dateFormat);
					filterValue = filterValue;
				}
				else {
					if (filterValue || (typeof filterValue === 'number') || (typeof filterValue === 'boolean'))
						filterValue = this.helper.removeAccents(filterValue.toString() as string).toUpperCase();
					else
						filterValue = '';

					if (value || (typeof value === 'number') || (typeof value === 'boolean'))
						value = this.helper.removeAccents(value.toString() as string).toUpperCase();
					else
						value = '';
				}

				if (filterCol && !isNullOrUndefined(filterValue) && filterValue !== '') {
					filterValue = this.helper.removeAccents(filterValue.toString() as string).toUpperCase();
					switch (filterMode) {
						case AgTableFilterMode.CONTAINS:
							ok = value.includes(filterValue);
							break;
						case AgTableFilterMode.EQUALS:
							ok = value === filterValue;
							break;
						case AgTableFilterMode.STARTS_WITH:
							ok = value.startsWith(filterValue);
							break;
						case AgTableFilterMode.ENDS_WITH:
							ok = value.endsWith(filterValue);
							break;
					}
				}

				if (!ok) break;
			}

			return ok;
		});

		return _data;
	}

	private applySort(data: any[], table: AgTableComponent) {
		if (table.actionChange === AgTableChangeAction.ORDER)
			table.setCurrentPage(1);

		if (table.header.colSorting) {
			let col = table.header.colSorting.col;
			let asc = table.header.colSorting.asc;

			let field = '';

			if (!col.field && col.customFilter && (col.customFilter as any[]).length) 
				field = (col.customFilter as any[])[0].field;
			else
				field = col.field;


			let dateRegex: RegExp = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
			let _data = data.sort((a: any, b: any) => {
                let valueA = a[field];
                let valueB = b[field];

                if (typeof valueA === 'string' && dateRegex.test(valueA))
                    valueA = new Date(valueA);
                if (typeof valueB === 'string' && dateRegex.test(valueB))
					valueB = new Date(valueB);

				if (typeof valueA === 'string' && !isNaN(parseFloat(valueA)))
					valueA = parseFloat(valueA);
				if (typeof valueB === 'string' && !isNaN(parseFloat(valueB)))
					valueB = parseFloat(valueB);

                if (valueA < valueB)
                    return asc ? -1 : 1;
                if (valueA > valueB)
                    return asc ? 1 : -1;

                return 0;
			});
			return _data;
		}

		return data;
	}

	private applyPaginate(data: any[], table: AgTableComponent) {
		let currentPage = table.currentPage;
		let size = table.paginate;

		let begin = (currentPage - 1) * size;
		let end = begin + size;

		let _data = data.slice(begin, end);

		return _data;
	}

}
