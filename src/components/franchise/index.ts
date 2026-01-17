import { IFranchise } from './franchise.model';
import { getFranchiseQuery } from './queries/getFranchise';
import { getFranchisesQuery } from './queries/getFranchises';
import { createFranchiseCommand } from './commands/createFranchise';
import { deleteFranchiseCommand } from './commands/deleteFranchise';

export interface IFranchisesComponent {
  getFranchise(id: string): Promise<IFranchise>;
  getFranchises(): Promise<IFranchise[]>;
  createFranchise(props: IFranchise): Promise<IFranchise>;
  deleteFranchise(id: string): Promise<void>;
}

export const franchisesComponent: IFranchisesComponent = {
  getFranchise: getFranchiseQuery,
  getFranchises: getFranchisesQuery,
  createFranchise: createFranchiseCommand,
  deleteFranchise: deleteFranchiseCommand,
};
