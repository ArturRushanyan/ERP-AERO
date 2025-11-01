const prisma = require("../config/prismaInstance");
const path = require("path");

const createFileRecord = async (fileData) => {
  try {
    const ext = path.extname(fileData.originalname).toLowerCase();

    const fileRecord = await prisma.fileRecord.create({
      data: {
        name: fileData.originalname,
        ext: ext,
        mime: fileData.mimetype,
        size: fileData.size,
        file_path: fileData.path,
      },
    });

    return fileRecord;
  } catch (error) {
    throw new Error(`Failed to create file record: ${error.message}`);
  }
};

const getFileById = async (id) => {
  try {
    const fileRecord = await prisma.fileRecord.findUnique({
      where: { id: parseInt(id) },
    });
    return fileRecord;
  } catch (error) {
    throw new Error(`Failed to get file: ${error.message}`);
  }
};

const deleteFile = async (id) => {
  try {
    await prisma.fileRecord.delete({
      where: { id: parseInt(id) },
    });

    return true;
  } catch (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};

const updateFile = async (id, newFileData) => {
  try {
    const ext = path.extname(newFileData.originalname).toLowerCase();

    const updatedFile = await prisma.fileRecord.update({
      where: { id: parseInt(id) },
      data: {
        name: newFileData.originalname,
        ext: ext,
        mime: newFileData.mimetype,
        size: newFileData.size,
        file_path: newFileData.path,
      },
    });

    return updatedFile;
  } catch (error) {
    throw {
      original_error: error.message,
      message: "Failed to update file info",
    };
  }
};

const getFilesPaginated = async (paginationData) => {
  try {
    const data = await prisma.fileRecord.findMany({
      skip: paginationData.offset,
      take: paginationData.limit,
    });

    return data;
  } catch (error) {
    throw new Error(`Failed to get files by pagination: ${error.message}`);
  }
};

module.exports = {
  createFileRecord,
  getFileById,
  deleteFile,
  updateFile,
  getFilesPaginated,
};
