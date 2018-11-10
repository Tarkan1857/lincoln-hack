export function getUserName(socket, parent) {
    return new Promise((resolve) => {
        const dom = `
            <section id="user">
                <form action="">
                    <input id="n" autocomplete="off"/><button>Send</button>
                </form>
            </section>`;
        parent.insertAdjacentHTML('beforeend', dom);
        const element = document.querySelector('#user');
        document.querySelector('#user > form').addEventListener('submit', (e) => {
            e.preventDefault();
            const inputElement = document.querySelector('#n');
            const name = inputElement.value;
            socket.emit('ready', name);
            element.remove();
            resolve(name);
        });
    });
}