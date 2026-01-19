import { UserModel, IUser } from '../user.model';
import { Result, ok, err } from 'neverthrow';
import { AppError, AppErrorType, createAppError } from '../../../shared/errors';

export const getUserQuery = async (id: string): Promise<Result<IUser, AppError>> => {
  const user = await UserModel.findById(id);
  if (!user) {
    return err(createAppError(
      AppErrorType.NOT_FOUND,
      `User with id ${id} not found`
    ));
  }
  return ok(user);
};
