export class AgTableEvent {
    page: number;
    pageSize: number;
    filters: { [key: string]: any };
    order: {
        field: string,
        asc: boolean
    };
    resetData: boolean;

    constructor(obj: Partial<AgTableEvent>) {
        Object.assign(this, obj);
    }
}
