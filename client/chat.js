export function createChat(socket, parent) {
    const dom = `
            <section id="chat">
                <ul id="messages"></ul>
                <form action="">
                    <input id="m" autocomplete="off"/><button>Send</button>
                </form>
            </section>`;
    parent.insertAdjacentHTML('beforeend', dom);

    document.querySelector('#chat > form').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputElement = document.querySelector('#m');
        socket.emit('chat', inputElement.value);
        inputElement.value = '';
    });
    socket.on('chat', (msg) => {
        const message = document.createElement('li');
        message.textContent = msg;
        document.querySelector('#chat > ul').appendChild(message);
    });

}