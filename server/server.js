const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8080});

const JOIN_STATUS = "JOIN";
const LEAVE_STATUS  = "LEAVE";

let connectedClients = [];
let drawHistory = [];
let clientIdCounter = 1;

wss.on('connection', (socket) => {
    loadDrawing(socket);

    socket.id = `user-${clientIdCounter++}`;
    let randomColor = '#' + ((Math.random() * 0xfffff * 1000000).toString(16)).slice(0, 6);
    connectedClients.push(socket.id);

    socket.send(JSON.stringify({
        type: 'client_id',
        id: socket.id,
        color: randomColor
    }));

    postNotification(socket, JOIN_STATUS);
    console.log('post notifications');

    socket.on('close', () => {
        let index = connectedClients.indexOf(socket.id);
        if(index > -1){
            connectedClients.splice(index, 1);
        }

        postNotification(socket, LEAVE_STATUS);
    });

    socket.on('message',  (message) => {
        const data = JSON.parse(message);

        if (data.type === 'draw_start' || data.type === 'draw_start_move' || data.type === 'draw_end'){
            drawHistory.push(data);
            wss.clients.forEach((client) => {
                if (client !== socket && client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify(data));
                }
            });
        }

        if (data.type === 'request_draw_history'){
            loadDrawing(socket);
        }
    });
});

function loadDrawing(client){
    //load drawing
    drawHistory.forEach((drawAction) => {
        client.send(JSON.stringify(drawAction));
    });
}

function postNotification(client, status) {
    let message_body = client.id + " " + status;
    const notification = {
        type: 'notification',
        message: message_body
    };

    wss.clients.forEach((c) => {
        if (c !== client && c.readyState === WebSocket.OPEN) {
            c.send(JSON.stringify(notification));
        }
    });
}