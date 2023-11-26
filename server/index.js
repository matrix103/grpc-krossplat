require('dotenv').config()
const grpc = require('@grpc/grpc-js');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = path.join(__dirname, '../protos/equation.proto');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const equation_proto = grpc.loadPackageDefinition(packageDefinition).equation;

function GenerateData(call) {
    const startTime = call.request.startTime;
    const endTime = call.request.endTime;
    const step = call.request.step;

    let count = 0;
    let numberOfIteration = Math.round((endTime - startTime) / step)
    const interval = setInterval(() => {
        if (count < numberOfIteration) {
            call.write({value: Math.cos(startTime + (step * count))});
            count++;
        } else {
            clearInterval(interval);
            call.end();
        }
    }, 2000);
}

const start = async () => {
    try {
       const server = new grpc.Server();
        server.addService(equation_proto.EquationService.service, {GenerateData: GenerateData});
        server.bindAsync('0.0.0.0:3000',
          grpc.ServerCredentials.createInsecure(),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
            server.start();
            console.log('started');
            }
          );
    } catch (e) {
        console.log(e)
    }
}

start()
