import { IFranchise } from './franchise.model';
import { getFranchiseQuery } from './queries/getFranchise';
import { getFranchisesQuery } from './queries/getFranchises';
import { createFranchiseCommand } from './commands/createFranchise';
import { deleteFranchiseCommand } from './commands/deleteFranchise';
import { Result } from 'neverthrow';
import { AppError } from '../../shared/errors';

export interface IFranchisesComponent {
  getFranchise(id: string): Promise<Result<IFranchise, AppError>>;
  getFranchises(): Promise<IFranchise[]>;
  createFranchise(props: IFranchise): Promise<IFranchise>;
  deleteFranchise(id: string): Promise<Result<void, AppError>>;
}

export const franchisesComponent: IFranchisesComponent = {
  getFranchise: getFranchiseQuery,
  getFranchises: getFranchisesQuery,
  createFranchise: createFranchiseCommand,
  deleteFranchise: deleteFranchiseCommand,
};
