import { Request, Response } from "express";
import Service from "../service.js";
import FranchiseService from "../services/franchiseService.js";

export default class FranchiseController {
  private franchiseService: FranchiseService;

  constructor(private microservice: Service) {
    this.microservice = microservice;
    this.franchiseService = new FranchiseService(this.microservice);
  }

  async index(req: Request, res: Response) {
    return res.json({
      data: await this.franchiseService.getFranchises(),
    });
  }
}
