const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`${__dirname}../index.html`);
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});
