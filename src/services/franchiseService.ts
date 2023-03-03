import { ObjectId } from "mongodb";
import Service from "../service.js";
import { Franchise } from "../ts/interfaces/FranchiseInterfaces.js";

export default class FranchiseService {
  constructor(private microservice: Service) {
    this.microservice = microservice;
  }

  async createFranchise(franchise: Franchise) {}

  async getFranchises(filters: { id?: string }) {
    const query: Record<string, unknown> = {};
    if (filters.id) query._id = new ObjectId(filters.id);

    const filteredDocs = await this.microservice.collection
      ?.find(query)
      .toArray();

    return filteredDocs;
  }
}
