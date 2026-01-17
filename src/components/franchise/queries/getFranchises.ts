import { FranchiseModel, IFranchise } from '../franchise.model';

export const getFranchisesQuery = async (): Promise<IFranchise[]> => {
  return await FranchiseModel.find();
};
