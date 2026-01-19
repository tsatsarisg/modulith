import { Router } from 'express';
import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validate } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import { createFranchiseSchema } from './franchise.schema';
import { IFranchisesComponent } from '../../components/franchise';
import { unwrapOrThrowHttpError } from '../../shared/errors';

export const createFranchiseRoutes = (franchisesComponent: IFranchisesComponent): Router => {
  const router = Router();

  router.get(
    '/:id',
    asyncHandler(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      if (!id) {
        res.status(400).json({ message: 'ID is required' });
        return;
      }
      const result = await franchisesComponent.getFranchise(id);
      const franchise = unwrapOrThrowHttpError(result);

      res.status(200).json(franchise);
    })
  );

  router.get(
    '/',
    asyncHandler(async (_req: Request, res: Response) => {
      const franchises = await franchisesComponent.getFranchises();
      res.status(200).json(franchises);
    })
  );

  router.post(
    '/',
    authenticate,
    validate(createFranchiseSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const franchise = await franchisesComponent.createFranchise(req.body);
      res.status(201).json(franchise);
    })
  );

  router.delete(
    '/:id',
    authenticate,
    asyncHandler(async (req: Request, res: Response) => {
      const id = req.params.id as string;
      if (!id) {
        res.status(400).json({ message: 'ID is required' });
        return;
      }
      const result = await franchisesComponent.deleteFranchise(id);
      unwrapOrThrowHttpError(result);

      res.status(204).send();
    })
  );

  return router;
};
