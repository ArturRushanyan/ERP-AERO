const configs = require("../config/config");
const messages = require("../utils/constMessages");
const {
  isValidEmailOrPhone,
  isValidPassword,
} = require("../utils/utilsForValidations");
const {
  getSessionByAccessToken,
  getSessionByRefreshToken,
} = require("../services/tokeSessionService");
const { verifyToken } = require("../utils/jwtHelper");

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

    const payload = verifyToken(token, configs.ACCESS_TOKEN_SECRET);
    req.user = { loginId: payload.id, accessToken: token };

    const session = await getSessionByAccessToken(token);
    if (!session) {
      throw { status: 401, message: messages.sessionExpired };
    }

    req.user["session"] = session;

    next();
  } catch (error) {
    next(error);
  }
};

const validateRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.headers.refresh || "";

    if (!refreshToken) {
      throw { status: 401, message: messages.noTokenProvided };
    }

    const payload = verifyToken(refreshToken, configs.REFRESH_TOKEN_SECRET);
    req.user = { loginId: payload.id, refreshToken };

    const session = await getSessionByRefreshToken(refreshToken);

    if (!session) {
      throw { status: 401, message: messages.sessionExpired };
    }

    req.user["session"] = session;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateSignUpParams,
  authenticateUser,
  validateRefreshToken,
};
