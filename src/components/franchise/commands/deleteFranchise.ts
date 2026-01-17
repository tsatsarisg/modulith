import { FranchiseModel } from '../franchise.model';

export const deleteFranchiseCommand = async (id: string): Promise<void> => {
  const result = await FranchiseModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error('Franchise not found');
  }
};
