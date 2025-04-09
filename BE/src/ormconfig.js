const { DataSource } = require("typeorm");
require("dotenv").config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 4354,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  // synchronize: true, 
  logging: true,
  entities: ["src/entities/**/*.js"],
});

module.exports = { AppDataSource };
