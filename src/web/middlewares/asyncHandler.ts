import { NextFunction, Request, Response } from 'express';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

export const asyncHandler = (callback: AsyncRequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
