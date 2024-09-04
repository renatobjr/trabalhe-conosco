import { Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

interface IDatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: string;
  dialect: Dialect;
}

export interface IConfigEnv {
  [key: string]: IDatabaseConfig;
}

const configEnv: IConfigEnv = {
  development: {
    database: process.env.DEV_DB_NAME as string,
    username: process.env.POSTGRES_DB_USER as string,
    password: process.env.POSTGRES_DB_PASSWORD as string,
    host: process.env.DEV_DB_HOST as string,
    port: process.env.DEV_DB_PORT as string,
    dialect: "postgres",
  },
  test: {
    database: process.env.TEST_DB_NAME as string,
    username: process.env.POSTGRES_DB_USER as string,
    password: process.env.POSTGRES_DB_PASSWORD as string,
    host: process.env.POSTGRES_DB_HOST as string,
    port: process.env.TEST_DB_PORT as string,
    dialect: "postgres",
  },
};

export default configEnv;
