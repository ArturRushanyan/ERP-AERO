const jwt = require("jsonwebtoken");
const configs = require("../config/config");
const messages = require("../utils/constMessages");
const {
  isValidEmailOrPhone,
  isValidPassword,
} = require("../utils/utilsForValidations");
const { getSessionByAccessToken } = require("../services/tokeSessionService");

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

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization || "";

    if (!token) {
      throw { status: 401, message: messages.noTokenProvided };
    }

    const session = await getSessionByAccessToken(token);
    if (!session) {
      throw { status: 401, message: messages.sessionExpired };
    }

    try {
      const payload = jwt.verify(token, configs.ACCESS_TOKEN_SECRET);
      req.user = { loginId: payload.id };
    } catch (error) {
      throw { status: 400, message: messages.TokenExpiredError };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateSignUpParams,
  authenticateUser,
};
