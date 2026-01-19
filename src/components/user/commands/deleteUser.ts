import { UserModel } from '../user.model';
import { Result, ok, err } from 'neverthrow';
import { AppError, AppErrorType, createAppError } from '../../../shared/errors';

export const deleteUserCommand = async (id: string): Promise<Result<void, AppError>> => {
  const result = await UserModel.findByIdAndDelete(id);
  if (!result) {
    return err(createAppError(
      AppErrorType.NOT_FOUND,
      `User with id ${id} not found`
    ));
  }
  return ok(undefined);
};
