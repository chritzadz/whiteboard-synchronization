function resizeCanvas(client){
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;

    if (socket.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
            type: 'request_draw_history',
            from_id: id
        }));
    }
}

const socket = new WebSocket('ws://localhost:8080');
const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');
let id = null;
let color = null;


window.addEventListener('resize', resizeCanvas);

let allowDraw = false;
canvas.addEventListener('mousedown', (e) => {
    allowDraw = true;
    startPath(context, e.clientX, e.clientY);

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: 'draw_start',
            x: e.clientX,
            y: e.clientY,
            color: color
        }));
    }
});

canvas.addEventListener('mouseup', (e) => {
    allowDraw = false;

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: 'draw_end'
        }));
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!allowDraw) return; //spinlock
    draw(context, color, e.clientX, e.clientY);

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            type: 'draw_start_move',
            x: e.clientX,
            y: e.clientY,
            color: color
        }));
    }
});

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if(data.type === 'client_id') {
        id = data.id;
        color = data.color;

        resizeCanvas(socket);
    }

    if (data.type === 'draw_start') {
        startPath(context, data.x, data.y);
    }

    if (data.type === 'draw_start_move') {
        draw(context, data.color, data.x, data.y);
    }

    if (data.type === 'draw_end') {
        closePath(context);
    }
}

function draw(context, color, x, y){
    console.log("drawinggg!");
    context.strokeStyle = color;
    context.lineTo(x, y);
    context.stroke();
}

function startPath(context, x, y){
    context.beginPath();
    context.moveTo(x, y);
}

function closePath(context){
    context.closePath();
}


