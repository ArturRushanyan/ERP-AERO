const fs = require("fs");
const { createFileRecord, getFileById } = require("../services/fileService");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileData = {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      filename: req.file.filename,
      path: req.file.path,
    };

    const fileRecord = await createFileRecord(fileData);

    res.status(201).json({
      message: "File uploaded successfully",
      file: {
        id: fileRecord.id,
        name: fileRecord.name,
        ext: fileRecord.ext,
        mime: fileRecord.mime,
        size: fileRecord.size,
        upload_date: fileRecord.upload_date,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFileInfo = async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const fileRecord = await getFileById(fileId);

    if (!fileRecord) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({
      data: {
        id: fileRecord.id,
        name: fileRecord.name,
        ext: fileRecord.ext,
        mime: fileRecord.mime,
        size: fileRecord.size,
        file_path: fileRecord.file_path,
        upload_date: fileRecord.upload_date,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const downloadFileAlternative = async (req, res) => {
  try {
    const fileId = req.params.id;
    const fileRecord = await getFileById(fileId);

    if (!fileRecord.file_path || !fs.existsSync(fileRecord.file_path)) {
      return res.status(404).json({
        error: "Physical file not found on server",
      });
    }

    res.download(fileRecord.file_path, fileRecord.name, (err) => {
      if (err) {
        console.error("Download error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to download file" });
        }
      }
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to download file" });
  }
};

module.exports = {
  uploadFile,
  getFileInfo,
  downloadFileAlternative,
};
