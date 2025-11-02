const prisma = require("../config/prismaInstance");

const getUserByLoginId = async (loginId) => {
  const user = await prisma.user.findUnique({
    where: { login: loginId },
  });

  return user;
};

const signUp = async (payload) => {
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        login: payload.loginId,
        password: payload.password,
      },
    });

    await tx.tokenSession.create({
      data: {
        userId: user.id,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      },
    });
  });
};

module.exports = {
  getUserByLoginId,
  signUp,
};
