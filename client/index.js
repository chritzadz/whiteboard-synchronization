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
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
});

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if(data.type === 'assign_id') {
        id = data.id;
    }
}


