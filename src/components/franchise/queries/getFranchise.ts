import { FranchiseModel, IFranchise } from '../franchise.model';
import { Result, ok, err } from 'neverthrow';
import { AppError, AppErrorType, createAppError } from '../../../shared/errors';

export const getFranchiseQuery = async (id: string): Promise<Result<IFranchise, AppError>> => {
  const franchise = await FranchiseModel.findById(id);
  if (!franchise) {
    return err(createAppError(
      AppErrorType.NOT_FOUND,
      `Franchise with id ${id} not found`
    ));
  }
  return ok(franchise);
};
