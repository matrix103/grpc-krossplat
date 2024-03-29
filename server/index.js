require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const {Suponkin} = require('./math/Suponkin');
const {Slepov} = require('./math/Slepov');
const {Sokolov} = require('./math/Sokolov');
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
  const {x1, x2, y1, y2, t1, t2, last_name} = call.request;
  console.log(call.request);
  let result = createMatrix(x2 + 2, y2 + 2);
  let resultTemp = createMatrix(x2 + 2, y2 + 2);
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
  const alpha = .5;
  const dt = 1;
  const dx = 1;
  const dy = 1;

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      result[x][y] = mathFunction(x, y, 0);
    }
  }

  for (let t = 1; t < t1; t++){
    resultTemp = result;
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        if (x > 100 || y > 100){
          result[x][y] = mathFunction(x, y, 0);
          continue;
        }
        const prev = resultTemp[x][y];
        const step =  alpha * dt / (dx * dx) * (resultTemp[x + 1][y] - 2 * resultTemp[x][y] + resultTemp[x - 1][y]) +
                              alpha * dt / (dy * dy) * (resultTemp[x][y + 1] - 2 * resultTemp[x][y] + resultTemp[x][y - 1]);
        result[x][y] = prev + step;
      }
    }
  }

  const interval = setInterval(() => {
    resultTemp = result;
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        if (x > 100 || y > 100){
          result[x][y] = mathFunction(x, y, 0);
          const z = result[x][y];
          points.push({x, y, z});
          continue;
        }
        const prev = resultTemp[x][y];
        const step = alpha * dt / (dx * dx) * (resultTemp[x + 1][y] - 2 * resultTemp[x][y] + resultTemp[x - 1][y]) +
                             alpha * dt / (dy * dy) * (resultTemp[x][y + 1] - 2 * resultTemp[x][y] + resultTemp[x][y - 1]);
        result[x][y] = prev + step;
        const z = result[x][y];
        points.push({x, y, z});
      }
    }
    if (count <= numberOfIteration) {
      call.write({value: points});
      points = [];
      count++;
      resultTemp = result;
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
      },
    );
  } catch (e) {
    console.log(e);
  }
};

function createMatrix(n, m) {
  let matrix = [];

  for (let i = 0; i < n; i++) {
// Создаем вложенные массивы для каждой строки
    let row = [];

    for (let j = 0; j < m; j++) {
// Заполняем каждый элемент нулем (вы можете использовать другие значения)
      row.push(0);
    }

// Добавляем строку в матрицу
    matrix.push(row);
  }

  return matrix;
}

start();
