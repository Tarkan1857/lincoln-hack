import {Socket} from "socket.io";
import {Team, User} from "./user";
import {Game} from "./game";

const server = require('http').createServer();

const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const minPlayerCount = 2;
const maxPlayerCount = 50;

let state = 'init';
const users: User[] = [];
let currentTeam = Team.CHAOS;
console.log(`running on ${port}`);
io.on('connection', (socket: Socket) => {
    console.log('user connected');
    const user = new User(currentTeam, socket);
    currentTeam = currentTeam === Team.CHAOS ? Team.ORDER : Team.CHAOS;
    users.push(user);
    socket.emit('team', user.team);
    console.log(`users: ${users.length}`);
    socket.on('chat', (msg) => {
        console.log(`chat: ${msg}`);
        io.emit('chat', msg);
    });

    socket.on('ready', (msg) => {
        user.ready = true;
        user.name = msg;
        console.log(`User named ${msg}`);
        io.emit('player-joined', msg);
        if(checkReady() || checkPlayerCount()) {
            console.log('starting game');
            startGame()
        }
    });

    socket.on('disconnect', () => {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        console.log('user disconnected');
        console.log(`users: ${users.length}`);
    })
});

function checkReady(): boolean {
    return users.every((u) => u.ready) && users.length >= minPlayerCount;
}

function checkPlayerCount(): boolean {
    return users.length === maxPlayerCount;
}

function startGame() {
    state = 'play';
    io.emit('state', state);
    const game = new Game(io, users);
    game.start();
}

server.listen(port);
