import {Socket} from "socket.io";
import {User} from "./user";

const server = require('http').createServer();

const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const minPlayerCount = 10;
const maxPlayerCount = 50;


let state = 'init';
const userSockets: Socket[] = [];
const users: User[] = [];
let currentTeam = 0;

io.on('connection', (socket: Socket) => {
    console.log('user connected');
    socket.emit('nameRequest');
    userSockets.push(socket);
    const user = new User(currentTeam);
    currentTeam = currentTeam === 0 ? 1 : 0;
    users.push(user);
    socket.emit('team', user.team);

    socket.on('chat', (msg) => {
        io.emit('chat', msg);
    });

    socket.on('ready', (msg) => {
        user.ready = true;
        user.name = msg;
        if(checkReady() || checkPlayerCount()) {
            startGame()
        }
    });

    socket.on('disconnect', () => {
        userSockets.splice(userSockets.indexOf(socket), 1);
        console.log('user disconnected');
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
}

server.listen(port);
