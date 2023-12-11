require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const { Suponkin } = require('./math/Suponkin');
const { Slepov } = require('./math/Slepov');
const { Sokolov } = require('./math/Sokolov');
const PROTO_PATH = path.join(__dirname, '../protos/equation.proto');

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
const equation_proto = grpc.loadPackageDefinition(packageDefinition).equation;

function GenerateData(call) {
  const { x1, x2, y1, y2, t1, t2, last_name } = call.request;
  console.log(call.request);

  let mathFunction;
  switch (last_name) {
    case 'Suponkin':
      mathFunction = Suponkin;
      break;
    case 'Sokolov':
      mathFunction = Sokolov;
      break;
    default:
      mathFunction = Slepov;
      break;
  }

  let count = 0;
  let numberOfIteration = Math.round((t2 - t1));
  let points = [];
  const interval = setInterval(() => {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        const z = mathFunction(x, y, t1 + count);
        points.push({ x, y, z });
      }
    }
    if (count <= numberOfIteration) {
      call.write({ value: points });
      points = [];
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
    server.addService(equation_proto.EquationService.service, { GenerateData: GenerateData });
    server.bindAsync('0.0.0.0:3000',
      grpc.ServerCredentials.createInsecure(),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        server.start();
        console.log('started');
      },
    );
  } catch (e) {
    console.log(e);
  }
};

start();
