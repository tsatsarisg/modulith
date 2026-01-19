import { IUser, IUserDocument } from './user.model';
import { getUserQuery } from './queries/getUser';
import { getUsersQuery } from './queries/getUsers';
import { getUserByEmailQuery } from './queries/getUserByEmail';
import { createUserCommand, CreateUserInput } from './commands/createUser';
import { deleteUserCommand } from './commands/deleteUser';
import { Result } from 'neverthrow';
import { AppError } from '../../shared/errors';

export interface IUsersComponent {
  getUser(id: string): Promise<Result<IUser, AppError>>;
  getUsers(): Promise<IUser[]>;
  getUserByEmail(email: string): Promise<IUserDocument | null>;
  createUser(props: CreateUserInput): Promise<IUserDocument>;
  deleteUser(id: string): Promise<Result<void, AppError>>;
}

export const usersComponent: IUsersComponent = {
  getUser: getUserQuery,
  getUsers: getUsersQuery,
  getUserByEmail: getUserByEmailQuery,
  createUser: createUserCommand,
  deleteUser: deleteUserCommand,
};

export type { IUser, IUserDocument } from './user.model';
export type { CreateUserInput } from './commands/createUser';
