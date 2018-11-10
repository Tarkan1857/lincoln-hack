import * as io from 'socket.io';
import {Game} from "../server/game";

const socket = io();

socket.on('ready', () => {
    new Game(socket);
});


