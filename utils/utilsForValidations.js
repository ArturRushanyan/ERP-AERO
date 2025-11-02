const validator = require("validator");

function isValidEmailOrPhone(id) {
  if (validator.isEmail(id)) {
    return true;
  }

  const cleanedPhone = id.replace(/[\s\-\(\)]/g, "");
  if (validator.isMobilePhone(cleanedPhone, "any")) {
    return true;
  }

  return false;
}

function isValidPassword(password) {
  if (!password || typeof password !== "string") {
    return false;
  }

  // Check minimum length (8 characters)
  if (!validator.isLength(password, { min: 8 })) {
    return false;
  }

  // Check it's not empty or only whitespace
  if (validator.isEmpty(password.trim())) {
    return false;
  }

  return true;
}

module.exports = {
  isValidPassword,
  isValidEmailOrPhone,
};
