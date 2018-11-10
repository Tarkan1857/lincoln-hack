import {Socket} from "socket.io";
import {User} from "./user";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req: any, res: any) => {
    res.send(`${__dirname}\\index.html`);
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});

const userSockets: Socket[] = [];
const users: User[] = [];

io.on('connection', (socket: Socket) => {
    console.log('user connected');
    socket.emit('nameRequest');
    userSockets.push(socket);
    const user = new User();
    users.push(user);

    socket.on('setName', (name) => {

    });

    socket.on('chat', (msg) => {
        io.emit('chat', msg);
    });

    socket.on('disconnect', () => {
        userSockets.splice(userSockets.indexOf(socket), 1);
        console.log('user disconnected');
    })
});
