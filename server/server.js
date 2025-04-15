const WebSocket = require('ws');

const ws = new WebSocket.Server({port:8080});

ws.on('connection', (socket) => {
    console.log("Connected!");
});