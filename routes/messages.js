/* api/messages */

const { Router } = require("express");
const { middleValidateJwt } = require("../middleware/validate-jwt");

const { getMessages } = require("../controller/get_messages");

const router = Router();

router.get('/:from', middleValidateJwt, getMessages);

module.exports = router;
