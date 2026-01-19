import { UserModel, IUserDocument } from '../user.model';

export const getUserByEmailQuery = async (
  email: string
): Promise<IUserDocument | null> => {
  return await UserModel.findOne({ email: email.toLowerCase() });
};
