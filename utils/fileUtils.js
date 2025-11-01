const fs = require("fs");

const deleteFileFromFileSystem = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw { message: "failed to delete file", status: 500 };
    }
  });
};

module.exports = {
  deleteFileFromFileSystem,
};
