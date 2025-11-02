const messages = require("../utils/constMessages");
const {
  isValidEmailOrPhone,
  isValidPassword,
} = require("../utils/utilsForValidations");

const validateSignUpParams = (req, res, next) => {
  try {
    const loginId = req.body.id;
    const password = req.body.password;

    if (!loginId || !password) {
      throw { status: 400, message: messages.signInParamsRequired };
    }

    const isEmailOrPhoneValid = isValidEmailOrPhone(loginId);
    if (!isEmailOrPhoneValid) {
      throw { status: 400, message: messages.sendValidIdParameter };
    }

    const isPasswordValid = isValidPassword(password);
    if (!isPasswordValid) {
      throw { status: 400, message: messages.invalidPassword };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateSignUpParams,
};
