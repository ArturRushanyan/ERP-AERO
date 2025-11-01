const fs = require("fs");
const messages = require("../utils/constMessages");
const {
  createFileRecord,
  getFileById,
  deleteFile,
  updateFile,
  getFilesPaginated,
} = require("../services/fileService");
const { deleteFileFromFileSystem } = require("../utils/fileUtils");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: messages.noFileUploaded });
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
      message: messages.fileUploadedSuccessfully,
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
      return res.status(404).json({ error: messages.fileNotFound });
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
        error: messages.NotFoundPhysicalFile,
      });
    }

    res.download(fileRecord.file_path, fileRecord.name, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.status(500).json({ error: messages.failedToDownloadFile });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: messages.failedToDownloadFile });
  }
};

const deleteFileById = async (req, res) => {
  try {
    const fileId = req.params.id;

    const fileRecord = await getFileById(fileId);
    if (!fileRecord) {
      throw { status: 404, message: messages.fileNotExists };
    }

    const filePath = fileRecord.file_path;
    await deleteFile(fileId);

    deleteFileFromFileSystem(filePath);

    res.status(200).json({ message: messages.fileDeletedSuccessfully });
  } catch (error) {
    if (error.message === messages.fileNotExists) {
      return res.status(error.status).json({ error: error.message });
    }
    res.status(500).json({ error: messages.internalServerError });
  }
};

const updateFileById = async (req, res) => {
  try {
    const oldFileId = parseInt(req.params.id);

    if (!req.file) {
      return res.status(400).json({ error: messages.noFileProvidedToUpdate });
    }

    const fileRecord = await getFileById(oldFileId);

    if (!fileRecord) {
      // NOTE: Deleting new uploaded file from file system.
      deleteFileFromFileSystem(req.file.path);
      return res.status(404).json({ error: messages.fileNoFoundToUpdate });
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
      message: messages.fileUpdatedSuccessfully,
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
    if (error.message === messages.failedToUpdateFileInfo) {
      // NOTE: Deleting a newly uploaded file in case of an error during the old file information update.
      deleteFileFromFileSystem(req.file.path);
    }
    if (error.message === messages.fileNotFound) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const getFileList = async (req, res, next) => {
  try {
    const result = await getFilesPaginated(req.pagination);

    return res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadFile,
  getFileInfo,
  downloadFile,
  deleteFileById,
  updateFileById,
  getFileList,
};
