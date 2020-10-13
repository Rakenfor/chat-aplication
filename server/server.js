const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

let app = express();
let server = http.createServer(app);

let pathPuclic = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(pathPuclic));

// IO = esta es la comunicación del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log('Escuchando en el puerto: ', port);
});