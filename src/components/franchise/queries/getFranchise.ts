import { FranchiseModel, IFranchise } from '../franchise.model';

export const getFranchiseQuery = async (id: string): Promise<IFranchise> => {
  const franchise = await FranchiseModel.findById(id);
  if (!franchise) {
    throw new Error('Franchise not found');
  }
  return franchise;
};
