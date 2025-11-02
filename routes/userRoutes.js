const express = require("express");
const {
  validateSignUpParams,
  authenticateUser,
  validateRefreshToken,
} = require("../middleware/userValidator");
const {
  signup,
  getUserInfo,
  logout,
  signIn,
  refreshToken,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", validateSignUpParams, signup);
router.get("/info", authenticateUser, getUserInfo);
router.get("/logout", authenticateUser, logout);
router.post("/signin", validateSignUpParams, signIn);
router.post("/signin/new_token", validateRefreshToken, refreshToken);

module.exports = router;
