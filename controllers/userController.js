const { getUserByLoginId, signUp } = require("../services/userService");
const { hashPassword } = require("../utils/hashUtils");
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

    const passwordHash = await hashPassword(password);
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

module.exports = {
  signup,
  getUserInfo,
};
