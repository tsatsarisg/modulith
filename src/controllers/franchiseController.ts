import { Request, Response } from "express";
import Service from "../service.js";
import FranchiseService from "../services/franchiseService.js";
import {
  FranchiseGetRequest,
  IFranchise,
} from "../ts/interfaces/FranchiseInterfaces.js";

export default class FranchiseController {
  private franchiseService: FranchiseService;

  constructor(private microservice: Service) {
    this.microservice = microservice;
    this.franchiseService = new FranchiseService(this.microservice);
  }

  async get(req: FranchiseGetRequest, res: Response) {
    const { id } = req.query;
    let filters = {};

    if (id)
      filters = {
        id: String(id),
      };

    return res.json(await this.franchiseService.getFranchises(filters));
  }

  async create(req: Request, res: Response) {
    const franchiseProps: IFranchise = { ...req.body };

    return res.json(
      await this.franchiseService.createFranchise(franchiseProps)
    );
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    return res.json(await this.franchiseService.deleteFranchise(id));
  }
}
