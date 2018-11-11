export class Timer extends PIXI.Text {
    constructor(socket) {
        super('', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffff,
            align: 'center'
        });
        this.socket = socket;
    }

    start() {
        this.socket.on('time-remaining', () => {

        });
    }
}