const { DataSource } = require("typeorm");
const config = require("../config/config");

const AppDataSource = new DataSource({
  type: "mysql",
  host: config.DATABASE.DB_HOST,
  port: config.DATABASE.DB_PORT,
  username: config.DATABASE.DB_USERNAME,
  password: config.DATABASE.DB_PASSWORD,
  database: config.DATABASE.DB_NAME,
  entities: [],
  synchronize: false,
  logging: true,
  extra: {
    connectionLimit: 10, // connection pool size
  },
});

module.exports = AppDataSource;
