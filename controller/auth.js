const { response, json } = require('express');
const bsync = require('bcryptjs');
const User = require('../model/user');
const { generateJwt } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        const emailAlreadyExist = await User.findOne({ email });
        if (emailAlreadyExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const user = new User(req.body);
        const salt = bsync.genSaltSync();
        user.password = bsync.hashSync(password, salt);

        await user.save();

        const token = await generateJwt(user.id);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error interno, por favor comuniquese con el administrador',
            body: req.body
        });
    }

}

module.exports = {
    createUser
}