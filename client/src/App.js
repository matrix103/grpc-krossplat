import {useRef, useState} from "react";


function App() {

    const socket = useRef()
    const [messages, setMessages] = useState([]);

    function connect() {
        socket.current = new WebSocket('ws://localhost:5001')

        socket.current.onopen = () => {
            const message = {
                event: 'connection',
                id: Date.now(),
                startTime: 0,
                endTime: 5,
                step: 1,
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const messageFromWS = JSON.parse(event.data)
            setMessages(prev => [messageFromWS, ...prev])
        }
    }
  return (
    <div className="App">
      <button onClick={connect}>WORK</button>
        <div>
            {messages.map((message) => (
                <p key={message.id}>{message.message}</p>
            ))}
        </div>

    </div>
  );
}

export default App;
