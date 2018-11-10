export class Chat {
    constructor(socket, parent) {
        this._socket = socket;
        this._parent = parent;
    }
    init() {
        const dom = `
            <section id="chat">
                <ul id="messages"></ul>
                <form action="">
                    <input id="m" autocomplete="off"/><button>Send</button>
                </form>
            </section>`;
        this._parent.insertAdjacentHTML('beforeend', dom);

        document.querySelector('#chat > form').addEventListener('submit', (e) => {
            e.preventDefault();
            const inputElement = document.querySelector('#m');
            this._socket.emit('chat', inputElement.value);
            inputElement.value  = '';
        });
        this._socket.on('chat', (msg) => {
            const message = document.createElement('li');
            message.textContent = msg;
            document.querySelector('#chat > ul').appendChild(message);
        });

    }
}