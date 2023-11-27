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
    console.log("222222222222222222222")
    const x1 = call.request.x1;
    const x2 = call.request.x2;
    const y1 = call.request.y1;
    const y2 = call.request.y2;
    const t1 = call.request.t1;
    const t2 = call.request.t2;

    let count = 0;
    let numberOfIteration = Math.round((t2-t1))
    let points = []
    const interval = setInterval(() => {

        for (let x=x1;x<=x2;x++){
            for (let y=y1;y<=y2;y++){
                const point = Math.sin(x+(t1+count))+(t1+count)*Math.sin(y+x)
                points.push(point)
            }
        }
        if (count < numberOfIteration) {
            console.log(points)
            call.write({value: points});
            points=[]
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
