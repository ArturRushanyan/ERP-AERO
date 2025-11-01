const fs = require("fs");
const messages = require("../utils/constMessages");

const deleteFileFromFileSystem = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw { message: messages.failedToDeleteFilePhysically, status: 500 };
    }
  });
};

module.exports = {
  deleteFileFromFileSystem,
};
