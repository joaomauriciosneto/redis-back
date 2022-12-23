import express from 'express';
import cors from 'cors';
import { userRoutes } from '../../app/features/users/routes/user.routes';
import { createRoutes } from '../server/express.routes';

export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  createRoutes(app);

  return app;

}
