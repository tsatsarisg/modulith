import { UserModel } from '../user.model';

export const deleteUserCommand = async (id: string): Promise<void> => {
  const result = await UserModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error('User not found');
  }
};
