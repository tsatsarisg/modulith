import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error | undefined, _req: Request, res: Response, next: NextFunction) => {
  if (err) {
    const message = err.message;
    return res.status(500).json({ message });
  }

  return next();
};

export default errorHandler;
