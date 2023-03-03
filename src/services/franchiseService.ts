import { Collection } from "mongodb";
import Service from "../service.js";
import { Franchise, FranchiseCategories } from "../ts/interfaces/Franchise.js";

export default class FranchiseService {
  constructor(private microservice: Service) {
    this.microservice = microservice;
  }

  async getFranchises() {
    const doc = this.microservice.collection?.find({});
    return doc;
  }
}
