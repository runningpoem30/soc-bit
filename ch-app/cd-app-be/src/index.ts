import { parse } from 'node:path';
import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({
    port : 8081 , 
})

interface User {
    socket : WebSocket , 
    room : string
}

let userCount = 0;
let allSockets : User[] = [];



wss.on('error' , (error) => {
    console.log('server error' + error)
    
})

wss.on('connection' , (ws) => {
 

    ws.on('message' , (message) => {
       const parsedMessage = JSON.parse(message as unknown as string);
    

       if(parsedMessage.type === "join"){
            allSockets.push({
                socket : ws , 
                room : parsedMessage.payload.roomId
            })
            userCount++
            ws.send("welcome to room number" + parsedMessage.payload.roomId)
       }

       if(parsedMessage.type === "chat"){
        const currentUserRoom = allSockets.find((x) => x.socket == ws)?.room

       allSockets.filter((user) => user.room === currentUserRoom)
       .forEach((user) => user.socket.send(parsedMessage.payload.message))

       ws.send("hi there from room" + currentUserRoom)
       }


      
    })


   ws.on("disconnect" , () =>{
    console.log("user disconnected")
   })
})