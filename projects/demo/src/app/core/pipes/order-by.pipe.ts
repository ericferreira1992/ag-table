import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderby'
})
export class OrderByPipe implements PipeTransform {

    private dateRegex: RegExp = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');

    transform(array: any[], field: string, asc: boolean = true): any[] {
        if (array)
            return array.sort((a: any, b: any) => {
                let valueA = a[field];
                let valueB = b[field];

                if (typeof valueA === 'string' && this.dateRegex.test(valueA))
                    valueA = new Date(valueA);
                if (typeof valueB === 'string' && this.dateRegex.test(valueB))
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
        return [];
    }

}
