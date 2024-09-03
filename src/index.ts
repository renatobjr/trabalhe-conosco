import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import handlerResponse from "@/middlewares/handlerReponse";

const PORT = process.env.PORT || 3000;

const api = express();

api
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(bodyParser.json())
  .use(morgan("dev"))
  .use(handlerResponse);

api.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[✔] Gateway gRPC Server is running on ${PORT}`);
});
