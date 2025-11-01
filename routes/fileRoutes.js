const express = require("express");
const { upload } = require("../config/multer");
const { fileIdCheck } = require("../middleware/fileCheck");
const {
  uploadFile,
  getFileInfo,
  downloadFileAlternative,
} = require("../controllers/fileController");

const router = express.Router();

// File routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/:id", fileIdCheck, getFileInfo);
router.get("/download/:id", fileIdCheck, downloadFileAlternative);

module.exports = router;
