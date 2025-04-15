const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8080});

let connectedClients = [];
let clientIdCounter = 1;

wss.on('connection', (socket) => {
    socket.id = `user-${clientIdCounter++}`;
    connectedClients.push(socket.id);

    //logs
    console.log(connectedClients);

    socket.send(JSON.stringify({
        type: 'client_id',
        id: socket.id
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