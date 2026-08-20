import { WebSocketServer } from "ws";
const wss = new WebSocketServer({
    port: 8081,
    perMessageDeflate: false
});
wss.on("headers", (headers, request) => {
    console.log("\n--- CLIENT REQUEST ---");
    console.log(request.headers);
    console.log("\n--- SERVER RESPONSE ---");
    console.log(headers);
});
wss.on("connection", (socket) => {
    console.log("CONNECTED");
    socket.on("message", (data) => {
        console.log("MESSAGE:", data.toString());
        if (data.toString() === "ping") {
            socket.send("pong");
        }
    });
    socket.on("error", (err) => {
        console.log("ERROR:", err);
    });
    setInterval(() => {
        socket.send("hi there");
    }, 2000);
});
//# sourceMappingURL=index.js.map