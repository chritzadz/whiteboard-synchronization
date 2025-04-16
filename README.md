# Whiteboard Synchronizaton
## Problem Definition
- realtime web-based collaboration whiteboard
- host with WebSocket
- frontend with HTML5 Canvas
- restricted to vanilla JavaScript (no external module)
- assign random color for new user connection

optional: possible WebSocket reconnection

## Explanation
The whiteboard will implement Multiple Client/Single Service software architecture. The implementation currently only provide a single interface for the whiteboard, with multiple clients can access the whiteboard and colloborate in the whiteboard.

## Synchronization Solution
To enable multiple clients collaborate on a shared interface (whiteboard), the solution a simple event-driven solution. There is three seperated drawing process, by which is driven by mouse inputs.
1. draw_start: initialize drawing action (driven by mousedown)
2. draw_start_move: draw on canvas (driven by mousedown and mousemove)
3. draw_end: complete drawing action (driven by mouseup)

Communication between client and server is already supported by WebSocket providing full-duplex communication. Each of the events will be passed by the client to the server. The server process the event and will broadcast to the current connected clients (excluding the client that initated the event). This ensures the real-time affect among the server lifetime.

All draw history (as long as the server lifetime) will be recorded in a drawHistory[] array which holds all drawing events happened during the lifetime of the server. Hence, everytime a new client madea connection, it can have an updated filled canvas.

## Run Project
1. 