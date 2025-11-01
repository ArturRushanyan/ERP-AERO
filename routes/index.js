const express = require("express");
const router = express.Router();
const fileRoutes = require("./fileRoutes");

// Use file routes
router.use("/file", fileRoutes);

module.exports = router;
