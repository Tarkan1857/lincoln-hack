import * as io from 'socket.io';
import {Game} from "./game";

const socket = io();

socket.on('ready', () => {
    const main = document.querySelector('main');
    const game = new Game(socket);
});


