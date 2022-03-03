export class AgTableDataRenderEvent<T> {
    public items: T[] = [];
    public length: number = 0;
    public startIndex: number = 0;
    public endIndex: number = 0;

    constructor(obj: Partial<AgTableDataRenderEvent<T>>) {
        Object.assign(this, obj);
    }
}
