import { Express } from 'express';
import { userRoutes } from '../../app/features/users/routes/user.routes';

export const createRoutes = (app: Express) => {

  app.use('/users', userRoutes());

}
