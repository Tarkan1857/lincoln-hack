import {Game} from "./game.js";
import {createChat} from "./chat.js";
import {getUserName} from "./user.js";
const socket = io('https://quiet-basin-53894.herokuapp.com');
//const socket = io('http://localhost:3000');
const assets = [
    ['pip', './client/GFX/Hp_pip.jpg'],
    ['map', './client/GFX/Map/Map.png'],
    ['map-overlay', './client/GFX/Map/Map_Overlay.png'],
    ['health-bar', './client/GFX/Map/hp_bank-264--189.png'],
    ['blue0', './client/GFX/Map_Segments/Blue_01-805-217.png'],
    ['blue1', './client/GFX/Map_Segments/Blue_02-518-548.png'],
    ['blue2', './client/GFX/Map_Segments/Blue_03-20-0.png'],
    ['blue3', './client/GFX/Map_Segments/Blue_04-391-234.png'],
    ['blue4', './client/GFX/Map_Segments/Blue_05-816-475.png'],
    ['blue5', './client/GFX/Map_Segments/Blue_06-1064-838.png'],
    ['blue6', './client/GFX/Map_Segments/Blue_07-857-711.png'],
    ['blue7', './client/GFX/Map_Segments/Blue_08-99-790.png'],
    ['blue8', './client/GFX/Map_Segments/Blue_09--162--41.png'],
    ['blue9', './client/GFX/Map_Segments/Blue_10-863--38.png'],
    ['blue10', './client/GFX/Map_Segments/Blue_11--38-530.png'],
    ['blue11', './client/GFX/Map_Segments/Blue_12-167--22.png'],
    ['blue12', './client/GFX/Map_Segments/Blue_13-912-428.png'],
    ['blue13', './client/GFX/Map_Segments/Blue_14-605-338.png'],
    ['blue14', './client/GFX/Map_Segments/Blue_15-864-11.png'],
    ['blue15', './client/GFX/Map_Segments/Blue_16-865-11.png'],
    ['blue16', './client/GFX/Map_Segments/Blue_17-876-315.png'],
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



