const express = require("express");
const {
  validateSignUpParams,
  authenticateUser,
} = require("../middleware/userValidator");
const {
  signup,
  getUserInfo,
  logout,
  signIn,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", validateSignUpParams, signup);
router.get("/info", authenticateUser, getUserInfo);
router.get("/logout", authenticateUser, logout);
router.post("/signin", validateSignUpParams, signIn);

module.exports = router;
