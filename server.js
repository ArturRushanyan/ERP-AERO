const config = require("./config/config");

const startServer = async (app) => {
  try {
    app.listen(config.PORT, () => {
      console.log(`Server is up on port: ${config.PORT}`);
    });
  } catch (error) {
    console.log("Server is not running:", error);
    process.exit(1);
  }
};

module.exports = startServer;
