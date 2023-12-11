import { useEffect, useRef, useState } from 'react';
import { createChart } from './Chart';

function App() {

  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState({});
  const [sliderValue, setSliderValue] = useState(null);
  console.log(currentMessage);

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
      values['last_name'] = document.getElementById('last_name').value;
      document.getElementById('work').style.display = 'none';
    } catch (e) {
      return;
    }

    socket.current.onopen = () => {
      const message = {
        event: 'connection',
        id: Date.now(),
        x1: values.x1,
        x2: values.x2,
        y1: values.y1,
        y2: values.y2,
        t1: values.t1,
        t2: values.t2,
        last_name: values.last_name,
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
    const chart = currentMessage && createChart(currentMessage);
    return () => chart?.destroy();
  }, [currentMessage]);

  useEffect(() => {
    messages.length && setCurrentMessage(messages[sliderValue]);
  }, [sliderValue]);

  return (
    <div className="App">
      <div className="container mt-3">
        <div className="input-group mb-3">
          <input id="x1" type="text" className="form-control" placeholder="x1" />
          <span className="input-group-text">начальное - x1, конечное - x2</span>
          <input id="x2" type="text" className="form-control" placeholder="x2" />
        </div>
        <div className="input-group mb-3">
          <input id="y1" type="text" className="form-control" placeholder="y1" />
          <span className="input-group-text">начальное - y1, конечное - y2</span>
          <input id="y2" type="text" className="form-control" placeholder="y2" />
        </div>
        <div className="input-group mb-3">
          <input id="t1" type="text" className="form-control" placeholder="t1" />
          <span className="input-group-text">начальное - t1, конечное - t2</span>
          <input id="t2" type="text" className="form-control" placeholder="t2" />
        </div>
        <div className="form-floating">
          <select className="form-select" id="last_name" name="last_name" aria-label="Floating label select example">
            <option selected value="Slepov">Тестовый</option>
            <option value="Suponkin">Супонькин</option>
            <option value="Sokolov">Соколов</option>
          </select>
          <label htmlFor="last_name">Чей метод использовать:</label>
        </div>

        <button onClick={connect} id="work" type="button" className="btn btn-outline-primary mt-3 mb-3">Запуск</button>

        <ul className="pagination mt-3">
          <li className="page-item">
            <button
              disabled={sliderValue === 0}
              className="page-link"
              onClick={() => setSliderValue((prevState) => prevState - 1)}
            >
              Назад
            </button>
          </li>
          {messages.map((el, i) => {
            return <li className="page-item">
              <button onClick={() => {
                setSliderValue(i);
              }} className={'page-link '  + (sliderValue === i ? 'active' : '')}
              >
                {i + 1}
              </button>
            </li>;
          })}
          <li className="page-item">
            <button
              onClick={() => setSliderValue((prevState) => prevState + 1)}
              disabled={sliderValue === messages.length - 1}
              className="page-link"
            >
              Вперед
            </button>
          </li>
        </ul>


        <div>
          <canvas id="myChart"></canvas>
          <div style={{
            background: 'linear-gradient(to right, #0000FF, green, #FF0000)',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            color: 'white',
            padding: 10,
            borderRadius: 16,
            boxSizing: 'border-box',
          }}>
            <span id="gradMinValue">0</span>
            <span id="gradMaxValue">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
