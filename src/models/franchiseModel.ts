import { FranchiseCategories } from "../ts/interfaces/FranchiseInterfaces.js";

export default class Franchise {
  private name: string;
  private category: FranchiseCategories;

  constructor(name: string, category: FranchiseCategories) {
    this.name = name;
    this.category = category;
  }

  public get getName(): string {
    return this.name;
  }

  public set setName(value: string) {
    this.name = value;
  }
}
