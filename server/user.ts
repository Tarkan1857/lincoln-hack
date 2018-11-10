export class User {
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    private _name: string;
}