import { Request, Response } from "express";

export default class FranchiseController {
  constructor() {}
  async index(req: Request, res: Response) {
    return res.send("gello");
  }
}
