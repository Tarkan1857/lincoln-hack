export class User {
    constructor(socket, parent) {
        this._socket = socket;
        this._parent = parent;
    }
    init() {
        const dom = `
            <form>
                
            </form>`;

        this._parent.insertAdjacentHTML('beforeend', dom);
    }
}