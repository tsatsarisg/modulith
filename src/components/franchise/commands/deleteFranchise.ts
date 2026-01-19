import { FranchiseModel } from '../franchise.model';
import { Result, ok, err } from 'neverthrow';
import { AppError, AppErrorType, createAppError } from '../../../shared/errors';

export const deleteFranchiseCommand = async (id: string): Promise<Result<void, AppError>> => {
  const result = await FranchiseModel.findByIdAndDelete(id);
  if (!result) {
    return err(createAppError(
      AppErrorType.NOT_FOUND,
      `Franchise with id ${id} not found`
    ));
  }
  return ok(undefined);
};
