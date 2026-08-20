import { WebSocket, WebSocketServer } from 'ws';
const wss = new WebSocketServer({
    port: 8081,
});
let userCount = 0;
let allSockets = [];
wss.on('error', (error) => {
    console.log('server error' + error);
});
wss.on('connection', (ws) => {
    allSockets.push(ws);
    userCount = userCount + 1;
    console.log('user connect #  ' + userCount);
    ws.on('message', (data) => {
        console.log('received message : ' + data.toString());
        allSockets.forEach((s) => {
            s.send(data.toString() + "sent from the server");
        });
    });
    //ws.send('hi there user #' + userCount )
});
//# sourceMappingURL=index.js.map