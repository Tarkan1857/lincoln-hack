import {Game} from "./game.js";
import {createChat} from "./chat.js";
import {getUserName} from "./user.js";

const socket = io('http://localhost:3000');

getUserName(socket, document.querySelector('main')).then((name) => {
    const main = document.querySelector('main');
    const game = new Game(socket);
    const chat = createChat(socket, document.body);
});

// // DEBUG
// const game = new Game(socket);



