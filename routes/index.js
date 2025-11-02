const express = require("express");
const router = express.Router();
const fileRoutes = require("./fileRoutes");
const userRoutes = require("./userRoutes");

// Use file routes
router.use("/file", fileRoutes);
router.use("/user", userRoutes);

module.exports = router;
