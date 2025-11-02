const express = require("express");
const {
  validateSignUpParams,
  authenticateUser,
} = require("../middleware/userValidator");
const { signup, getUserInfo } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", validateSignUpParams, signup);
router.get("/info", authenticateUser, getUserInfo);

module.exports = router;
