const { getUserByLoginId, signUp } = require("../services/userService");
const {
  deactivateSession,
  addUserSessionTokens,
} = require("../services/tokeSessionService");
const { hashPassword, comparePassword } = require("../utils/hashUtils");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtHelper");
const messages = require("../utils/constMessages");

const signup = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    const doesUserExists = await getUserByLoginId(id);

    if (doesUserExists) {
      throw { status: 409, message: messages.userAlreadyExists };
    }

    const passwordHash = hashPassword(password);
    const signUpPayload = {
      refreshToken: generateRefreshToken({ id }),
      accessToken: generateAccessToken({ id }),
      password: passwordHash,
      loginId: id,
    };

    await signUp(signUpPayload);

    return res.status(201).json({
      data: {
        accessToken: signUpPayload.accessToken,
        refreshToken: signUpPayload.refreshToken,
      },
      message: messages.successFullyRegistered,
    });
  } catch (error) {
    next(error);
  }
};

const getUserInfo = (req, res, next) => {
  try {
    return res.status(200).json({ id: req.user.loginId });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const payload = {
    accessToken: req.user.accessToken,
    userId: req.user.session.userId,
    isActive: true,
  };

  await deactivateSession(payload);
  return res.status(200).json({ success: true });
};

const signIn = async (req, res, next) => {
  try {
    const { id, password } = req.body;

    const user = await getUserByLoginId(id);

    if (!user) {
      throw { status: 409, message: messages.wrongLoginOrPassword };
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      throw { status: 409, message: messages.wrongLoginOrPassword };
    }

    const signInPayload = {
      refreshToken: generateRefreshToken({ id }),
      accessToken: generateAccessToken({ id }),
      userId: user.id,
    };

    await addUserSessionTokens(signInPayload);

    return res.status(200).json({
      data: {
        accessToken: signInPayload.accessToken,
        refreshToken: signInPayload.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { session } = req.user;

    const refreshSessionPayload = {
      refreshToken: generateRefreshToken({ id: req.user.loginId }),
      accessToken: generateAccessToken({ id: req.user.loginId }),
      userId: session.userId,
    };

    await addUserSessionTokens(refreshSessionPayload);

    return res.status(200).json({
      data: {
        accessToken: refreshSessionPayload.accessToken,
        refreshToken: refreshSessionPayload.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  getUserInfo,
  logout,
  signIn,
  refreshToken,
};
