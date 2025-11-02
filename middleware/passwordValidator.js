const validator = require("validator");

function isValidPassword(password) {
  if (!password || typeof password !== "string") {
    return false;
  }

  if (!validator.isLength(password, { min: 8 })) {
    return false;
  }

  if (validator.isEmpty(password.trim())) {
    return false;
  }

  return true;
}

module.exports = {
  isValidPassword,
};
