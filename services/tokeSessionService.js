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

const deactivateSession = async (payload) => {
  return await prisma.tokenSession.update({
    where: {
      ...payload,
    },
    data: {
      isActive: false,
    },
  });
};

module.exports = {
  getSessionByAccessToken,
  deactivateSession,
};
