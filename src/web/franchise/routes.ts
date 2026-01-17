import { Router } from 'express';
import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validate } from '../middlewares/validate';
import { createFranchiseSchema } from './franchise.schema';
import { IFranchisesComponent } from '../../components/franchise';

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
      const franchise = await franchisesComponent.getFranchise(id);
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
    validate(createFranchiseSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const franchise = await franchisesComponent.createFranchise(req.body);
      res.status(201).json(franchise);
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
      await franchisesComponent.deleteFranchise(id);
      res.status(204).send();
    })
  );

  return router;
};
