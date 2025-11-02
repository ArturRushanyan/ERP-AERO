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

const addUserSessionTokens = async (payload) => {
  await prisma.tokenSession.create({
    data: {
      ...payload,
    },
  });
};

module.exports = {
  getSessionByAccessToken,
  deactivateSession,
  addUserSessionTokens,
};
