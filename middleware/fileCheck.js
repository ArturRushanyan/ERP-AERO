const fileIdCheck = (req, res, next) => {
  try {
    const fileId = req.params.id;

    if (!fileId) {
      return res.status(400).json({
        error: "File ID is required",
      });
    }

    if (isNaN(parseInt(fileId))) {
      return res.status(400).json({
        error: "Invalid file ID format",
      });
    }

    next();
  } catch (error) {
    console.error("File check middleware error:", error);
    res.status(500).json({
      error: "Internal server error during file validation",
    });
  }
};

const validatePagination = (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.list_size) || 10;

    if (page < 1) {
      return res.status(400).json({
        error: "Page must be greater than 0",
      });
    }

    if (limit < 1 || limit > 100) {
      return res.status(400).json({
        error: "Limit must be between 1 and 100",
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
      error: "Internal server error during file validation",
    });
  }
};

module.exports = {
  fileIdCheck,
  validatePagination,
};
