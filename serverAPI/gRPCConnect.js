const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../protos/equation.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const equation_proto = grpc.loadPackageDefinition(packageDefinition).equation;

function gRPCConnect() {
    let target = 'localhost:3000';
    return new equation_proto.EquationService(target,
        grpc.credentials.createInsecure());

}

module.exports = gRPCConnect


