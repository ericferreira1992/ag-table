export class AgTableEvent {
    page: number = 1;
    pageSize: number = 0;
    filters: { [key: string]: any };
    order: {
        field: string,
        asc: boolean
    } = {} as any;
    resetData: boolean = false;

    constructor(obj: Partial<AgTableEvent>) {
        Object.assign(this, obj);
    }
}
