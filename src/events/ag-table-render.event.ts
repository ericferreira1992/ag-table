export class AgTableRenderEvent<T> {
    public items: T[] = [];
    public length: number = 0;
    public startIndex: number = 0;
    public endIndex: number = 0;

    constructor(obj: Partial<AgTableRenderEvent<T>>) {
        Object.assign(this, obj);
    }
}
