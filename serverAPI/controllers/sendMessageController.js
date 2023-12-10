const gRPCConnect = require('../gRPCConnect');
const grpc = require('@grpc/grpc-js');

const sendMessage = (message, ws) => {
  const clientGRPC = gRPCConnect();
  console.log(`Calling SayHelloStreamReply`);

  return new Promise((resolve, reject) => {

    const call = clientGRPC.GenerateData({
      x1: message.x1,
      x2: message.x2,
      y1: message.y1,
      y2: message.y2,
      t1: message.t1,
      t2: message.t2,
      last_name: message.last_name,
    });

    call.on('data', value => {
      console.log(`Received response ${value.value}`);
      ws.send(JSON.stringify({ ...message, message: value.value }));
    });
    call.on('status', status => {
      console.log(`Received status with code=${grpc.status[status.code]} details=${status.details}`);
      resolve();
    });
  });
};

module.exports = sendMessage;
