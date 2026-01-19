import { createSignupCommand, SignupInput, AuthResult } from './commands/signup';
import { createLoginQuery, LoginInput } from './queries/login';
import { verifyToken, TokenPayload } from './utils/token';
import { IUsersComponent, usersComponent } from '../user';
import { Result } from 'neverthrow';
import { AppError } from '../../shared/errors';

export interface IAuthComponent {
  signup(input: SignupInput): Promise<Result<AuthResult, AppError>>;
  login(input: LoginInput): Promise<Result<AuthResult, AppError>>;
  verifyToken(token: string): TokenPayload | null;
}

export const createAuthComponent = (users: IUsersComponent): IAuthComponent => ({
  signup: createSignupCommand(users),
  login: createLoginQuery(users),
  verifyToken: verifyToken,
});

export const authComponent: IAuthComponent = createAuthComponent(usersComponent);

export type { SignupInput, AuthResult } from './commands/signup';
export type { LoginInput } from './queries/login';
export type { TokenPayload } from './utils/token';
