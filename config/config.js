require("dotenv").config();

const PORT = Number(process.env.PORT) || 3000;
const DB_PORT = Number(process.env.DB_PORT);
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "";
const DB_HOST = process.env.DB_HOST || "";

module.exports = {
  PORT: PORT,
  DATABASE: {
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
  },
};
