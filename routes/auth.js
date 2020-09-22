/*
    path: /api/login
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, validateJwt } = require("../controller/auth");
const { validateFields } = require("../middleware/validar-campos");
const { middleValidateJwt } = require("../middleware/validate-jwt");

const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo electronico es obligatorio').not().isEmpty(),
    check('email', 'El correo electronico no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields],
    createUser);

router.post('/', [
    check('email', 'No ingresó el correo').not().isEmpty(),
    check('email', 'El correo electronico no es valido').isEmail(),
    check('password', 'No ingresó la contraseña').not().isEmpty(),
    validateFields
], loginUser)

router.get('/renew', middleValidateJwt, validateJwt);

module.exports = router;