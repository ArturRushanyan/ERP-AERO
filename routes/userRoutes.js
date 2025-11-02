const express = require("express");
const { validateSignUpParams } = require("../middleware/userValidator");
const { signup } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", validateSignUpParams, signup);

module.exports = router;
