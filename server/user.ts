export class User {
    get ready(): string {
        return this._ready;
    }
    set ready(value: string) {
        this._ready = value;
    }
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }
    private _name: string;
    private _ready: string;
}