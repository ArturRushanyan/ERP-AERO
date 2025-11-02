const signup = async (req, res) => {
  const { id, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { login: id } });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const passwordHash = await authService.hashPassword(password);

  const user = await prisma.user.create({
    data: { login: id, passwordHash },
  });

  const tokens = await authService.createSession(user.id);
  res.json(tokens);
};

module.exports = {
  signup,
};
