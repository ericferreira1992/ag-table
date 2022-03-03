import { AgTableFilterType } from '../enums/ag-table-filter-type.enum';

export const FILTER_TYPES = Object.keys(AgTableFilterType).map(key => AgTableFilterType[key]) as string[];