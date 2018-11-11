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
        const bgOverlay = new PIXI.Sprite.fromImage("map-overlay");
        game.stage.addChild(bgOverlay);

        this.spawnMapSegments(game);
        this.spawnButton(game);

        this.spawnHealthbar(game);
    }

    spawnMapSegments(game)
    {
        this.mapSegmentPos = [
            new PIXI.Point(805, 217),
            new PIXI.Point(518, 548),
            new PIXI.Point(20, 0),
            new PIXI.Point(391, 234),
            new PIXI.Point(816, 475),
            new PIXI.Point(1064, 838),
            new PIXI.Point(857, 711),
            new PIXI.Point(99, 790),
            new PIXI.Point(162, 41),
            new PIXI.Point(863, 38),
            new PIXI.Point(38,530),
            new PIXI.Point(167, 22),
            new PIXI.Point(912, 428),
            new PIXI.Point(605, 338),
            new PIXI.Point(864, 11),
            new PIXI.Point(865, 11),
            new PIXI.Point(876, 315),
        ];
        this.mapSegments =[];
        for(let seg = 0; seg < 17; ++seg)
        {
            this.mapSegments.push(new PIXI.Sprite.fromImage('blue'+seg));
            this.mapSegments[this.mapSegments.length - 1].position.x = this.mapSegments[seg].x;
            this.mapSegments[this.mapSegments.length - 1].position.y = this.mapSegments[seg].y;
            game.stage.addChild(this.mapSegments[this.mapSegments.length -1]);
        }
    }

    spawnHealthbar(game)
    {
        let healthBarBG = new PIXI.Sprite.fromImage('health-bar');
        healthBarBG.position.x = 264;
        healthBarBG.position.y = 0;
        game.stage.addChild(healthBarBG);

        this.healthBar = new HealthBar(100);
        this.healthBar.x = 325;
        this.healthBar.y = 16;

        game.stage.addChild(this.healthBar);
    }

    spawnButton(game) {
        const button = new Button(this.view.width * 0.5, this.view.height * 0.5, 100, 100);
        game.stage.addChild(button);
    }

    onGameReady() {
        return;
    }
}
