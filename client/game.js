import {Button} from "./ui/button.js";
import {HealthBar} from "./ui/health-bar.js";

export class Game {
    constructor(socket) {
        this._socket = socket;
        const game = new PIXI.Application({width: 1920, height: 1080});
        game.renderer.autoResize = true;
        this.view = game.view;
        const main = document.querySelector('main');

        main.appendChild(this.view);

        this.spawnObjects(game);
    }

    spawnObjects(game) {
        const background = new PIXI.Sprite.fromImage("GFX/Map.jpg");
        game.stage.addChild(background);
        this.spawnButton(game);
    }

    spawnHealthbar(game)
    {
       
    }

    spawnButton(game) {
        const button = new Button(this.view.width * 0.5, this.view.height * 0.5, 100, 100);
        game.stage.addChild(button);
    }
}
