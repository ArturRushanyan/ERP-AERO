const uploadFile = async (req, res, next) => {
  try {
    res.status(201).json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadFile,
};
