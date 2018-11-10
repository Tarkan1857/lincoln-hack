import * as PIXI from "pixi.js";
import {Socket} from "socket.io";

export class Game {
    constructor(private socket: Socket) {
        const game = new PIXI.Application({width: 1280, height: 720});
        const main = document.querySelector('main');
        main.innerHTML = '';
        main.appendChild(game.view);

    }
}
