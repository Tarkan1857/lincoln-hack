import {Game} from "./game.js";
import {Chat} from "./chat.js";

const socket = io('http://localhost:3000');

socket.on('ready', () => {
    const main = document.querySelector('main');
    const game = new Game(socket);
});

// DEBUG
const game = new Game(socket);
const chat = new Chat(socket, document.body);
chat.init();


