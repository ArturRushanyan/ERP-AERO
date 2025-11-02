const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/config");
const messages = require("./constMessages");

const generateTokenByGivenParams = ({ payload, tokenSecret, expiration }) => {
  const accessToken = jwt.sign(payload, tokenSecret, { expiresIn: expiration });

  return accessToken;
};

const generateAccessToken = (userData) => {
  const payload = {
    tokenSecret: ACCESS_TOKEN_SECRET,
    payload: { id: userData.id },
    expiration: "10m",
  };
  return generateTokenByGivenParams(payload);
};

const generateRefreshToken = (userData) => {
  const payload = {
    tokenSecret: REFRESH_TOKEN_SECRET,
    payload: { id: userData.id },
    expiration: "1h",
  };
  return generateTokenByGivenParams(payload);
};

const verifyToken = (token, secret) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    throw { status: 400, message: messages.TokenExpiredError };
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
