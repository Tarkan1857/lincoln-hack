import {Button} from "./ui/button.js";
import {HealthBar} from "./ui/health-bar.js";

export class Game {
    constructor(socket) {
        this.players = [];
        this._socket = socket;
        this.game = new PIXI.Application({width: 1520, height: 1080, autoResize: true, resolution: devicePixelRatio});

        this.view = this.game.view;
        const main = document.querySelector('main');

        main.appendChild(this.view);

        this.spawnObjects(this.game);

        window.addEventListener("resize", this.resize.bind(this));

        this._socket.on("starting", ()=> {
            console.log('onGameReady');
            this.onGameReady();
        })
    }

    resize() {
        const parent = this.view.parentNode;
        // Resize the renderer
        this.game.renderer.resize(parent.clientWidth, parent.clientHeight);
    }

    spawnObjects(game) {
        const background = new PIXI.Sprite.fromImage("map");
        game.stage.addChild(background);
        this.spawnButton(game);

        this.spawnHealthbar(game);
    }

    spawnHealthbar(game)
    {
        this.healthBar = new HealthBar(100);
        this.healthBar.x = 325;
        this.healthBar.y = 16;

        game.stage.addChild(this.healthBar);
    }

    spawnButton(game) {
        const button = new Button(this.view.width * 0.5, this.view.height * 0.5, 100, 100);
        game.stage.addChild(button);
    }

    onGameReady(name) {
        this.players.push(name)
    }
}
