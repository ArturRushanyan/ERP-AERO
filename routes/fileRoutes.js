const express = require("express");
const { upload } = require("../config/multer");
const { fileIdCheck } = require("../middleware/fileCheck");
const {
  uploadFile,
  getFileInfo,
  downloadFile,
  deleteFileById,
  updateFileById,
} = require("../controllers/fileController");

const router = express.Router();

// File routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/:id", fileIdCheck, getFileInfo);
router.get("/download/:id", fileIdCheck, downloadFile);
router.delete("/delete/:id", fileIdCheck, deleteFileById);
router.put("/update/:id", fileIdCheck, upload.single("file"), updateFileById);

module.exports = router;
