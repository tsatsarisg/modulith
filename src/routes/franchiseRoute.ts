import { Router } from "express";
import FranchiseController from "../controllers/franchiseController.js";
import Service from "../service.js";

const router = (microservice: Service) => {
  const servicePaths = Router();
  const franchiseController = new FranchiseController(microservice);

  servicePaths.get(
    "/franchise",
    franchiseController.get.bind(franchiseController)
  );

  servicePaths.post(
    "/franchise",
    franchiseController.create.bind(franchiseController)
  );

  servicePaths.delete(
    "/franchise/:id",
    franchiseController.delete.bind(franchiseController)
  );

  return servicePaths;
};

export default router;
