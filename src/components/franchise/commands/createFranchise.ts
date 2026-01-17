import { FranchiseModel, IFranchise } from '../franchise.model';

export const createFranchiseCommand = async (props: IFranchise): Promise<IFranchise> => {
  const franchise = new FranchiseModel(props);
  return await franchise.save();
};
