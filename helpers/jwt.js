const jwt = require('jsonwebtoken');

const generateJwt = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h',
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No fue posible generar el token de autenticacion');
            } else {
                resolve(token);
            }
        });

    });
}

const comprobarJwt = (token = '') => {
    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];

    } catch (error) {
        return [false, null];
    }
}

module.exports = { generateJwt, comprobarJwt };