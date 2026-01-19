import { UserModel, IUserDocument } from '../user.model';
import { hashPassword } from '../../auth/utils/password';

export interface CreateUserInput {
  email: string;
  password: string;
}

export const createUserCommand = async (
  props: CreateUserInput
): Promise<IUserDocument> => {
  const hashedPassword = await hashPassword(props.password);

  const user = new UserModel({
    email: props.email.toLowerCase(),
    password: hashedPassword,
  });

  return await user.save();
};
