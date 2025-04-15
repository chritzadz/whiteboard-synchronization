const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8080});

let connectedClients = [];
let clientIdCounter = 1;

wss.on('connection', (socket) => {
    socket.id = `user-${clientIdCounter++}`;
    let randomColor = '#' + ((Math.random() * 0xfffff * 1000000).toString(16)).slice(0, 6);
    connectedClients.push(socket.id);

    //logs
    console.log(connectedClients);
    console.log(randomColor);

    socket.send(JSON.stringify({
        type: 'client_id',
        id: socket.id,
        color: randomColor
    }));
    console.log(`new connection: ${socket.id}\n`);


    socket.on('close', () => {
        let index = connectedClients.indexOf(socket.id);
        if(index > -1){
            connectedClients.splice(index, 1);
        }

        //logs
        console.log(connectedClients);
        console.log(`remove connection: ${socket.id}\n`);
    });
});