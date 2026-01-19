import { Router } from 'express';
import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { authenticate } from '../middlewares/authenticate';
import { IUsersComponent } from '../../components/user';
import { unwrapOrThrowHttpError } from '../../shared/errors';

export const createUserRoutes = (usersComponent: IUsersComponent): Router => {
  const router = Router();
  router.use(authenticate);

  router.get(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      if (!id) {
        res.status(400).json({ message: 'ID is required' });
        return;
      }
      const result = await usersComponent.getUser(id);
      const user = unwrapOrThrowHttpError(result);

      res.status(200).json(user);
    })
  );

  router.get(
    '/',
    asyncHandler(async (_req: Request, res: Response) => {
      const users = await usersComponent.getUsers();
      res.status(200).json(users);
    })
  );

  router.delete(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      if (!id) {
        res.status(400).json({ message: 'ID is required' });
        return;
      }
      const result = await usersComponent.deleteUser(id);
      unwrapOrThrowHttpError(result);

      res.status(204).send();
    })
  );

  return router;
};
