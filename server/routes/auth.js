const router = require("express").Router();

const { loginController, registerController } = require("../controller/auth");

//register

router.post("/register", registerController);

//login

router.post("/login", loginController);

module.exports = router;
