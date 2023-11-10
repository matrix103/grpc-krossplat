const gRPCConnect = require("../gRPCConnect");
const grpc = require('@grpc/grpc-js');

const sendMessage = (message, ws) => {
    const clientGRPC = gRPCConnect()
    console.log(`Calling SayHelloStreamReply`);
    return new Promise((resolve, reject) => {
        const call = clientGRPC.GenerateData({startTime: message.startTime, endTime: message.endTime, step: message.step});
        call.on('data', value => {
            console.log(`Received response ${value.value}`);
            ws.send(JSON.stringify({...message, message: value.value}));
        });
        call.on('status', status => {
            console.log(`Received status with code=${grpc.status[status.code]} details=${status.details}`);
            resolve();
        });
    });
}

module.exports = sendMessage