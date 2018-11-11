import {Game} from "./game.js";
import {createChat} from "./chat.js";
import {getUserName} from "./user.js";
import {Timer} from "./ui/timer.js";
const socket = io('https://quiet-basin-53894.herokuapp.com');
//const socket = io('http://localhost:3000');
const assets = [
    ['pip', './client/GFX/Hp_pip.jpg'],
    ['map', './client/GFX/Map/Map.png'],
    ['map-overlay', './client/GFX/Map/Map_Overlay.png'],
    ['health-bar', './client/GFX/Map/hp_bank-264--189.png']
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

document.querySelector('#restart').addEventListener('click', () => {
    socket.emit('restart');
});



