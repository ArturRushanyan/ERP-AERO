const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");
const routes = require("./routes");

const startServer = async (app) => {
  try {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.text());

    app.use("/api", routes);

    await app.listen(config.PORT, () => {
      console.log(`Server is up on port: ${config.PORT}`);
    });
  } catch (error) {
    console.log("Server is not running:", error);
    process.exit(1);
  }
};

module.exports = startServer;
