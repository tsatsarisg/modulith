import { UserModel, IUser } from '../user.model';

export const createUserCommand = async (props: IUser): Promise<IUser> => {
  const user = new UserModel(props);
  return await user.save();
};
