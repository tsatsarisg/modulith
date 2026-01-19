export const AppErrorType = {
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  VALIDATION: 'VALIDATION',
  INTERNAL: 'INTERNAL',
} as const;

export type AppErrorType = (typeof AppErrorType)[keyof typeof AppErrorType];

export interface AppError {
  type: AppErrorType;
  message: string;
}

export const createAppError = (type: AppErrorType, message: string): AppError => ({
  type,
  message,
});

// HTTP status code mapping for each error type
export const errorStatusCodes: Record<AppErrorType, number> = {
  [AppErrorType.NOT_FOUND]: 404,
  [AppErrorType.CONFLICT]: 409,
  [AppErrorType.UNAUTHORIZED]: 401,
  [AppErrorType.VALIDATION]: 400,
  [AppErrorType.INTERNAL]: 500,
};

// HTTP Error class for route handlers
export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly type: AppErrorType,
    message: string
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

// Utility to unwrap Result or throw HttpError
import { Result } from 'neverthrow';

export const unwrapOrThrowHttpError = <T>(result: Result<T, AppError>): T => {
  if (result.isErr()) {
    const error = result.error;
    throw new HttpError(errorStatusCodes[error.type], error.type, error.message);
  }
  return result.value;
};
