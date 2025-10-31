const config = require("./config/config");
const cors = require("corse");

const startServer = async (app) => {
  try {
    app.use(cors());

    app.listen(config.PORT, () => {
      console.log(`Server is up on port: ${config.PORT}`);
    });
  } catch (error) {
    console.log("Server is not running:", error);
    process.exit(1);
  }
};

module.exports = startServer;
