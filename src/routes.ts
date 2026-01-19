import { Router } from 'express';
import { usersComponent, franchisesComponent, authComponent } from './components';
import { createFranchiseRoutes } from './web/franchise/routes';
import { createUserRoutes } from './web/user/routes';
import { createAuthRoutes } from './web/auth/routes';

export default (): Router => {
  const router = Router();
  
  router.use('/auth', createAuthRoutes(authComponent));
  router.use('/franchises', createFranchiseRoutes(franchisesComponent));
  router.use('/users', createUserRoutes(usersComponent));
  
  return router;
};
