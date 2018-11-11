export class Timer extends PIXI.Text {
    constructor(socket) {
        super('0:10', {
            fontFamily: 'Arial',
            fontSize: 64,
            fill: 0xffffff,
            align: 'center'
        });
        this.socket = socket;
    }

    start() {
        this.socket.on('time-remaining', (time) => {
            const timeSeconds = Math.round(time / 1000);
            const minutes = Math.floor(timeSeconds / 60);
            const seconds = timeSeconds % 60;

            this.text = `${minutes}:${seconds}`;
        });
    }
}