import { UserModel, IUser } from '../user.model';

export const getUserQuery = async (id: string): Promise<IUser> => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
