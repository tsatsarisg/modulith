import { Router } from 'express';
import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validate } from '../middlewares/validate';
import { createUserSchema } from './user.schema';
import { IUsersComponent } from '../../components/user';

export const createUserRoutes = (usersComponent: IUsersComponent): Router => {
  const router = Router();

  router.get(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      if (!id) {
        res.status(400).json({ message: 'ID is required' });
        return;
      }
      const user = await usersComponent.getUser(id);
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

  router.post(
    '/',
    validate(createUserSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const user = await usersComponent.createUser(req.body);
      res.status(201).json(user);
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
      await usersComponent.deleteUser(id);
      res.status(204).send();
    })
  );

  return router;
};
