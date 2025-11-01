const express = require("express");
const { upload } = require("../config/multer");
const { getFileInfoCheck } = require("../middleware/fileCheck");
const { uploadFile, getFileInfo } = require("../controllers/fileController");

const router = express.Router();

// File routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/:id", getFileInfoCheck, getFileInfo);

module.exports = router;
