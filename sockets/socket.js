const { comprobarJwt } = require('../helpers/jwt');
const { io } = require('../index');

// Mensajes de sockets
io.on('connection', client => {
    console.log('Resiviendo un nuevo intento de conexión');

    const x_token = client.handshake.headers['x-token'];
    // console.log(x_token);
    const [valid_client, uid] = comprobarJwt(x_token)
    console.log(valid_client, uid);
    if (!valid_client) { return client.disconnect(); }

    console.log("Cliente conectado");

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!', payload);
        io.emit('mensaje', { admin: "Se conectó un nuevo usuario" });
        client.emit('mensaje', { admin: "Bienvenido" });
    });
});