# whiteboard-synchronization
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
As to let multiple client collaborate on a single interface, I implemented a standard solution. I seperated 3 main events of drawing into:
1. draw_start
2. draw_start_move
3. draw_end

each of the event in the client will be sent to the server. and then server will process and send to all the clients (except sending back to the same client sending the JSON).
