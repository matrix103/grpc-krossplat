require('dotenv').config()
const WebSocket = require('ws');
const sendMessage = require("./controllers/sendMessageController");
const PORT = process.env.PORT || 5001
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'connection':
                console.log('Соединение установлено');
                sendMessage(message, ws)
                break;
        }
    })
})


