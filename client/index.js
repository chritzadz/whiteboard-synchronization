function resizeCanvas(){
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
}

const socket = new WebSocket('ws://localhost:8080');
const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');
let id = null;
let color = null;
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

let allowDraw = false;
canvas.addEventListener('mousedown', (e) => {
    allowDraw = true;
    context.beginPath();
    context.moveTo(e.clientX, e.clientY)
});

canvas.addEventListener('mouseup', (e) => {
    allowDraw = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (!allowDraw) return; //spinlock
    draw(context, color, e.clientX, e.clientY);

    //send information of drawing to server
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            from_id: id,
            type: 'draw_update',
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
    }

    if(data.type === 'draw_update'){
        console.log("get from draw_updates");
        draw(context, data.color, data.x, data.y);
    }
}

function draw(context, color, x, y){
    console.log("drawinggg!");
    context.strokeStyle = color;
    context.lineTo(x, y);
    context.stroke();
}


