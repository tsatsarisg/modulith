import { UserModel, IUser } from '../user.model';

export const getUsersQuery = async (): Promise<IUser[]> => {
  return await UserModel.find();
};
