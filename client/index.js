window.onload = () => {
    function resizeCanvas(){
        canvas.width = window.innerWidth - 10;
        canvas.height = window.innerHeight - 10;
    }
    
    const socket = new WebSocket('ws://localhost:8080');
    const canvas = document.getElementById('whiteboard');
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);
}


