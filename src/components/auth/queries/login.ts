import { IUsersComponent } from '../../user';
import { verifyPassword } from '../utils/password';
import { generateToken } from '../utils/token';
import { Result, ok, err } from 'neverthrow';
import { AppError, AppErrorType, createAppError } from '../../../shared/errors';

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

export const createLoginQuery = (usersComponent: IUsersComponent) => {
  return async (input: LoginInput): Promise<Result<AuthResult, AppError>> => {
    const { email, password } = input;

    const user = await usersComponent.getUserByEmail(email);
    if (!user) {
      return err(createAppError(
        AppErrorType.UNAUTHORIZED,
        'Invalid email or password'
      ));
    }
    
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return err(createAppError(
        AppErrorType.UNAUTHORIZED,
        'Invalid email or password'
      ));
    }

    const token = generateToken(user._id.toString(), user.email);

    return ok({
      user: {
        id: user._id.toString(),
        email: user.email,
      },
      token,
    });
  };
};
