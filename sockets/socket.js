const { changeUserStatus } = require('../controller/change_user_status');
const { saveMessage } = require('../controller/socket');
const { comprobarJwt } = require('../helpers/jwt');
const { io } = require('../index');

// Mensajes de sockets
io.on('connection', client => {
    console.log('Resiviendo un nuevo intento de conexión');

    const x_token = client.handshake.headers['x-token'];
    // console.log(x_token);
    const [valid_client, uid] = comprobarJwt(x_token)
    if (!valid_client) { return client.disconnect(); }

    console.log("Cliente conectado");
    changeUserStatus(uid, true);

    client.join(uid);

    client.on('personal-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        changeUserStatus(uid, false)
    });

    client.on('mensaje', (payload) => {
        io.emit('mensaje', { admin: "Se conectó un nuevo usuario" });
    });
});