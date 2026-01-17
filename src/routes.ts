import { Router } from 'express';
import { usersComponent, franchisesComponent } from './components';
import { createFranchiseRoutes } from './web/franchise/routes';
import { createUserRoutes } from './web/user/routes';

export default (): Router => {
  const router = Router();
  
  router.use('/franchises', createFranchiseRoutes(franchisesComponent));
  router.use('/users', createUserRoutes(usersComponent));
  
  return router;
};
