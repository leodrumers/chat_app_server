/*
    path: /api/login
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { createUser } = require("../controller/auth");
const { validateFields } = require("../middleware/validar-campos");

const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo electronico es obligatorio').not().isEmpty(),
    check('email', 'El correo electronico no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields],
    createUser);


module.exports = router;