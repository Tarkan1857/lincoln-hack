import * as PIXI from "pixi.js";
import {Server} from "socket.io";

export class Game {
    private readonly view: HTMLCanvasElement;
    constructor(private socket: Server) {
        const game = new PIXI.Application({width: 1280, height: 720});
        this.view = game.view;
        const main = document.querySelector('main');
        main.appendChild(this.view);

    }
}
