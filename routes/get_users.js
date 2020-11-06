/*
    path: /api/users
*/
const { Router } = require("express");
const { getUsers } = require("../controller/get_users");
const { middleValidateJwt } = require("../middleware/validate-jwt");

const router = Router();

router.get('/', middleValidateJwt, getUsers);

module.exports = router;