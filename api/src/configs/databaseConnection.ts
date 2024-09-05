import { Sequelize } from "sequelize";
import configEnv from "@/configs/configEnv";

const ENV = process.env.NODE_ENV || "development";
const dbConfig = configEnv[ENV];

const connection = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: parseInt(dbConfig.port),
  dialect: "postgres",
});

export default connection;
