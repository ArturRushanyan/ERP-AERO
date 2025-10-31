const startServer = async (app) => {
  try {
    app.listen(3000, () => {
      console.log(`Server is up on port: ${3000}`);
    });
  } catch (error) {
    console.log("Server is not running:", error);
    process.exit(1);
  }
};

module.exports = startServer;
