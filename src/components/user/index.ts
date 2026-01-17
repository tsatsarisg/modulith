import { IUser } from './user.model';
import { getUserQuery } from './queries/getUser';
import { getUsersQuery } from './queries/getUsers';
import { createUserCommand } from './commands/createUser';
import { deleteUserCommand } from './commands/deleteUser';

export interface IUsersComponent {
  getUser(id: string): Promise<IUser>;
  getUsers(): Promise<IUser[]>;
  createUser(props: IUser): Promise<IUser>;
  deleteUser(id: string): Promise<void>;
}

export const usersComponent: IUsersComponent = {
  getUser: getUserQuery,
  getUsers: getUsersQuery,
  createUser: createUserCommand,
  deleteUser: deleteUserCommand,
};
