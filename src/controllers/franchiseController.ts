import { Request, Response } from "express";
import Service from "../service.js";
import FranchiseService from "../services/franchiseService.js";
import { FranchiseGetRequest } from "../ts/interfaces/FranchiseInterfaces.js";

export default class FranchiseController {
  private franchiseService: FranchiseService;

  constructor(private microservice: Service) {
    this.microservice = microservice;
    this.franchiseService = new FranchiseService(this.microservice);
  }

  async index(req: FranchiseGetRequest, res: Response) {
    const { id } = req.query;
    const filters = {
      id: String(id),
    };
    console.log(filters);

    return res.json(await this.franchiseService.getFranchises(filters));
  }
}
