import { IUsersComponent } from '../../user';
import { generateToken } from '../utils/token';
import { Result, ok, err } from 'neverthrow';
import { AppError, AppErrorType, createAppError } from '../../../shared/errors';

export interface SignupInput {
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

export const createSignupCommand = (usersComponent: IUsersComponent) => {
  return async (input: SignupInput): Promise<Result<AuthResult, AppError>> => {
    const { email, password } = input;

    const existingUser = await usersComponent.getUserByEmail(email);
    if (existingUser) {
      return err(createAppError(
        AppErrorType.CONFLICT,
        `User with email ${email} already exists`
      ));
    }

    const savedUser = await usersComponent.createUser({ email, password });
    
    const token = generateToken(savedUser._id.toString(), savedUser.email);

    return ok({
      user: {
        id: savedUser._id.toString(),
        email: savedUser.email,
      },
      token,
    });
  };
};
