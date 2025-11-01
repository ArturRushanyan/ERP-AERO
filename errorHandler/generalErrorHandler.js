const messages = require("../utils/constMessages");

const errorHandler = (error, req, res, next) => {
  return res.status(error.status || 500).json({
    success: false,
    error: {
      message: error?.message || messages.internalServerError,
    },
  });
};

module.exports = errorHandler;
