const fileIdCheck = async (req, res, next) => {
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

module.exports = {
  fileIdCheck,
};
