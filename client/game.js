export class Game {
    constructor(socket) {
        this._socket = socket;
        const game = new PIXI.Application({width: 1280, height: 720});
        this.view = game.view;
        const main = document.querySelector('main');
        main.appendChild(this.view);
    }
}
