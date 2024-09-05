import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import handlerResponse from "@/middlewares/handlerReponse";
import producerRoutes from "@/routes/ruralProducerRoutes";
import dataGraphRoutes from "@/routes/dataGraphsRoutes";
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
  .use(producerRoutes)
  .use(dataGraphRoutes);

connection?.authenticate().then(async () => {
  if (process.env.NODE_ENV != "test") {
    connection.sync({ force: true }).then(async () => await seed());
  } else {
    connection.sync();
  }

  api.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[✔] API Server is running on ${PORT}`);
  });
});

export default api;
