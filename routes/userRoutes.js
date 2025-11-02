const express = require("express");
const {
  validateSignUpParams,
  authenticateUser,
} = require("../middleware/userValidator");
const {
  signup,
  getUserInfo,
  logout,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", validateSignUpParams, signup);
router.get("/info", authenticateUser, getUserInfo);
router.get("/logout", authenticateUser, logout);

module.exports = router;
