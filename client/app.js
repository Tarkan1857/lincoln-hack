import {Game} from "./game.js";
import {createChat} from "./chat.js";
import {getUserName} from "./user.js";
const socket = io('https://quiet-basin-53894.herokuapp.com');
//const socket = io('http://localhost:3000');
const assets = [
    ['pip', './client/GFX/Hp_pip.jpg'],
    ['map', './client/GFX/Map.jpg'],
];

assets.forEach((a) => PIXI.loader.add(a[0], a[1]));
PIXI.loader.load();

getUserName(socket, document.querySelector('main')).then((name) => {
    const main = document.querySelector('main');
    const game = new Game(socket);
    const chat = createChat(socket, document.body);
});

// // DEBUG
// const game = new Game(socket);



