import { Router } from "express";
import FranchiseController from "../controllers/franchiseController.js";
import Service from "../service.js";

const router = (microservice: Service) => {
  const servicePaths = Router();
  const franchiseController = new FranchiseController(microservice);

  servicePaths.get(
    "/franchise",
    franchiseController.index.bind(franchiseController)
  );

  return servicePaths;
};

export default router;
