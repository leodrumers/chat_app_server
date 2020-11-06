const express = require('express');
const path = require('path');
require('dotenv').config();

// Db config
const { dbConnection } = require('./database/config')
dbConnection();

// Creación de app de express
const app = express();

// Leyendo y parseando body de peticiones http
app.use(express.json());

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');


// Crear ruta publica
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


// Creacion de rutas
app.use('/api/login', require('./routes/auth'))
app.use('/api/users', require('./routes/get_users'))

server.listen(process.env.PORT, (error) => {
    if (error) throw new Error(error);
    console.log('Server running in port: ', process.env.PORT);
});