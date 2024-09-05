import { Router } from "express";
import dataGraphService from "@/services/dataGraphService";

const router = Router();
const basePath = "/api/v1/data-graphs";

router.get(basePath, dataGraphService.getData);

export default router;
