import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../shared/errors';

const errorHandler = (err: Error | undefined, _req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ 
        type: err.type,
        message: err.message 
      });
    }
    
    const message = err.message || 'Internal Server Error';
    return res.status(500).json({ 
      type: 'INTERNAL',
      message 
    });
  }

  return next();
};

export default errorHandler;
