
    function resizeCanvas(){
        canvas.width = window.innerWidth - 10;
        canvas.height = window.innerHeight - 10;
    }
    
    const socket = new WebSocket('ws://localhost:8080');
    const canvas = document.getElementById('whiteboard');
    let id = null;
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if(data.type === 'assign_id') {
            id = data.id;
        }
    }


