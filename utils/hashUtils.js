const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = () => {};

module.exports = {
  hashPassword,
  comparePassword,
};
