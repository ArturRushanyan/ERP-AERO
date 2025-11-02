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

module.exports = {
  isValidEmailOrPhone,
};
