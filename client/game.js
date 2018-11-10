import {Button} from "./ui/button.js";

export class Game {
    constructor(socket) {
        this._socket = socket;
        const game = new PIXI.Application({width: 1280, height: 720});
        this.view = game.view;
        const main = document.querySelector('main');
        
        main.appendChild(this.view);

        this.spawnButton(game);
    }

    spawnButton(game) {
        const button = new Button(this.view.width * 0.5, this.view.height * 0.5, 100, 100);
        game.stage.addChild(button);
    }
}
