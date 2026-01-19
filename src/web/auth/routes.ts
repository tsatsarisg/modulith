import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validate } from '../middlewares/validate';
import { signupSchema, loginSchema } from './auth.schema';
import { IAuthComponent } from '../../components/auth';
import { unwrapOrThrowHttpError } from '../../shared/errors';

export const createAuthRoutes = (authComponent: IAuthComponent): Router => {
  const router = Router();

  router.post(
    '/signup',
    validate(signupSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const result = await authComponent.signup(req.body);
      const data = unwrapOrThrowHttpError(result);

      res.status(201).json({
        message: 'User registered successfully',
        ...data,
      });
    })
  );

  router.post(
    '/login',
    validate(loginSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const result = await authComponent.login(req.body);
      const data = unwrapOrThrowHttpError(result);

      res.status(200).json({
        message: 'Login successful',
        ...data,
      });
    })
  );

  router.post(
    '/verify',
    asyncHandler(async (req: Request, res: Response) => {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const token = authHeader.split(' ')[1];
      
      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }
      
      const payload = authComponent.verifyToken(token);

      if (!payload) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
      }

      res.status(200).json({
        message: 'Token is valid',
        user: {
          id: payload.userId,
          email: payload.email,
        },
      });
    })
  );

  return router;
};
