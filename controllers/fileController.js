const { createFileRecord } = require("../services/fileService");

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

module.exports = {
  uploadFile,
};
