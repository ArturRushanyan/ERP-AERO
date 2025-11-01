const express = require("express");
const { upload } = require("../config/multer");
const { uploadFile } = require("../controllers/fileController");

const router = express.Router();

// File routes
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
