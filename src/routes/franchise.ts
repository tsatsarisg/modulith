import { Router } from "express";
import FranchiseController from "../controllers/franchiseController.js";
import Service from "../service.js";

const router = (microservice: Service) => {
  const servicePaths = Router();
  const franchiseController = new FranchiseController();

  servicePaths.get("/franchise", franchiseController.index);

  return servicePaths;
};

export default router;
