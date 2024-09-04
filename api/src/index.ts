import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import handlerResponse from "@/middlewares/handlerReponse";
import router from "@/routes/ruralProducerRoutes";
import connection from "@/configs/databaseConnection";
import seed from "@/data/seed";

const PORT = process.env.PORT as string;

const api = express();

api
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(bodyParser.json())
  .use(morgan("dev"))
  .use(handlerResponse)
  .use(router);

connection?.authenticate().then(async () => {
  let isForceSync = process.env.NODE_ENV === "test" ? true : false;

  connection.sync({ force: isForceSync });
  // eslint-disable-next-line no-console
  console.log("[✔] Connection has been established successfully.");

  if (isForceSync == false) {
    await seed();
  }

  api.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[✔] API Server is running on ${PORT}`);
  });
});

export default api;
