import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [socket , setSocket] = useState()
  const [message , setMessage] = useState()

  function sendMessage(e){
    if(!socket){
      return;
    }

    //@ts-ignore
    socket.send(message);
  }


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    setSocket(ws)

    ws.onmessage  = (ev) => {
      alert(ev.data);
    }
    
  } , [])

 return (
  <div>
   <input type='text' placeholder='message ....' value={message}onChange={(e) => setMessage(e.target.value)}></input>
   <button onClick={sendMessage}> send message</button>
  </div>
 )
}

export default App
