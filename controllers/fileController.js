const fs = require("fs");
const {
  createFileRecord,
  getFileById,
  deleteFile,
  updateFile,
} = require("../services/fileService");
const { deleteFileFromFileSystem } = require("../utils/fileUtils");

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

const downloadFile = async (req, res) => {
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

const deleteFileById = async (req, res) => {
  try {
    const fileId = req.params.id;

    const fileRecord = await getFileById(fileId);
    if (!fileRecord) {
      throw { status: 404, message: "File not exists" };
    }

    const filePath = fileRecord.file_path;
    await deleteFile(fileId);

    deleteFileFromFileSystem(filePath);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    if (error.message === "File not exists") {
      return res.status(error.status).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const updateFileById = async (req, res) => {
  try {
    const oldFileId = parseInt(req.params.id);

    if (!req.file) {
      return res.status(400).json({ error: "No file provided for update" });
    }

    const fileRecord = await getFileById(oldFileId);

    if (!fileRecord) {
      // NOTE: Deleting new uploaded file from file system.
      deleteFileFromFileSystem(req.file.path);
      return res.status(404).json({ error: "File not found to update" });
    }

    const newFileData = {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      filename: req.file.filename,
      path: req.file.path,
    };

    const updatedFile = await updateFile(oldFileId, newFileData);

    // NOTE: Deleting old file from file system.
    deleteFileFromFileSystem(fileRecord.file_path);

    res.json({
      message: "File updated successfully",
      file: {
        id: updatedFile.id,
        name: updatedFile.name,
        ext: updatedFile.ext,
        mime: updatedFile.mime,
        size: updatedFile.size,
        file_path: updatedFile.file_path,
      },
    });
  } catch (error) {
    if (error.message === "Failed to update file info") {
      // NOTE: Deleting a newly uploaded file in case of an error during the old file information update.
      deleteFileFromFileSystem(req.file.path);
    }
    if (error.message === "File not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadFile,
  getFileInfo,
  downloadFile,
  deleteFileById,
  updateFileById,
};
