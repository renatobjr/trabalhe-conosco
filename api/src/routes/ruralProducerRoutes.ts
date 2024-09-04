import { Router } from "express";
import ruralProducerService from "@/services/ruralProducerService";

const router = Router();
const { create, get, update, remove } = ruralProducerService;
const basePath = "/api/v1/rural-producers";

router
  .post(basePath, create)
  .get(`${basePath}/:id`, get)
  .put(`${basePath}/:id`, update)
  .delete(`${basePath}/:id`, remove);

export default router;
