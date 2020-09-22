const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log('Init db config');
        await mongoose.connect(process.env.DBCONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('db online');
    } catch (error) {
        console.log(error);
        throw new Error('Ha ocurrido un error, valide con el administrador');
    }
}

module.exports = {
    dbConnection
}