const prisma = require("../config/prismaInstance");

const _getSessionByGivenParams = async (payload) => {
  return prisma.tokenSession.findFirst({
    where: {
      ...payload,
      isActive: true,
    },
  });
};

const getSessionByAccessToken = async (accessToken) => {
  return _getSessionByGivenParams({ accessToken });
};

module.exports = {
  getSessionByAccessToken,
};
