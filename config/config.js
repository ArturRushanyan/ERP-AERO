require("dotenv").config();

const PORT = Number(process.env.PORT) || 3000;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

module.exports = {
  PORT: PORT,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
};
