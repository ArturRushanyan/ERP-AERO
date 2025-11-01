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

module.exports = {
  createFileRecord,
};
