import {Game} from "./game";

const socket = io('http://localhost:3000');

socket.on('ready', () => {
    const main = document.querySelector('main');
    const game = new Game(socket);
});

// DEBUG
const game = new Game(socket);


