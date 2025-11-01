const messages = require("../utils/constMessages");

const fileIdCheck = (req, res, next) => {
  try {
    const fileId = req.params.id;

    if (!fileId) {
      return res.status(400).json({
        error: messages.fileIdIsRequired,
      });
    }

    if (isNaN(parseInt(fileId))) {
      return res.status(400).json({
        error: messages.invalidFileIdFormat,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: messages.internalServerError,
    });
  }
};

const validatePagination = (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.list_size) || 10;

    if (page < 1) {
      return res.status(400).json({
        error: messages.pageValueMustBePositive,
      });
    }

    if (limit < 1 || limit > 100) {
      return res.status(400).json({
        error: messages.pageLimitValueError,
      });
    }

    const offset = (page - 1) * limit;

    req.pagination = {
      limit,
      offset,
    };

    next();
  } catch (error) {
    res.status(500).json({
      error: messages.internalServerError,
    });
  }
};

module.exports = {
  fileIdCheck,
  validatePagination,
};
