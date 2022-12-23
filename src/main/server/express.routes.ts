import { Express } from 'express';
import { noteRoutes } from '../../app/features/notes/routes/notes.route';
import { userRoutes } from '../../app/features/users/routes/user.routes';

export const createRoutes = (app: Express) => {

  app.use('/users', userRoutes());
  app.use('/notes', noteRoutes());

}
