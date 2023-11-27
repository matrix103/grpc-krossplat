import { useEffect, useRef, useState } from 'react';
import { createChart } from './Chart';

function App() {

  const socket = useRef();
  const [messages, setMessages] = useState([]);

  function connect() {
    socket.current = new WebSocket('ws://localhost:5001');
    const values = {};
    try {
      ['x1', 'x2', 'y1', 'y2', 't1', 't2'].forEach((id) => {
        const value = Number(document.getElementById(id).value);
        if (isNaN(value)) {
          throw new Error();
        }
        values[id] = value;
      });
      document.getElementById('work').style.display = 'none';
    } catch (e) {
      return;
    }

    socket.current.onopen = () => {
        console.log(values)
      const message = {
        event: 'connection',
        id: Date.now(),
        x1: values.x1,
        x2: values.x2,
        y1: values.y1,
        y2: values.y2,
        t1: values.t1,
        t2: values.t2,
        ...values,
      };
      socket.current.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const messageFromWS = JSON.parse(event.data);
      setMessages(prev => [messageFromWS, ...prev]);
    };
  }

  useEffect(() => {
    const chart = createChart();
    return () => chart.destroy();
  }, [])

  return (
    <div className="App">
      <div>
        <input id='x1' type="text" placeholder='x1' />
        <input id='x2' type="text" placeholder='x2' />
      </div>
      <div>
        <input id='y1' type="text" placeholder='y1' />
        <input id='y2' type="text" placeholder='y2' />
      </div>
      <div>
        <input id='t1' type="text" placeholder='t1' />
        <input id='t2' type="text" placeholder='t2' />
      </div>
      <button id="work" onClick={connect}>WORK</button>

      <canvas id="myChart"></canvas>

      <div>
        {messages.map((message) => (
          <p key={message.id}>{message.message}</p>
        ))}
      </div>

    </div>
  );
}

export default App;
