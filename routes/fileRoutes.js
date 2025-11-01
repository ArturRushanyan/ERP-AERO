const express = require("express");
const { upload } = require("../config/multer");
const { fileIdCheck, validatePagination } = require("../middleware/fileCheck");
const {
  uploadFile,
  getFileInfo,
  downloadFile,
  deleteFileById,
  updateFileById,
  getFileList,
} = require("../controllers/fileController");

const router = express.Router();

// File routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/list", validatePagination, getFileList);
router.get("/download/:id", fileIdCheck, downloadFile);
router.delete("/delete/:id", fileIdCheck, deleteFileById);
router.put("/update/:id", fileIdCheck, upload.single("file"), updateFileById);
router.get("/:id", fileIdCheck, getFileInfo);

module.exports = router;
