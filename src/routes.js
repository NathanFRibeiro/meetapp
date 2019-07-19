import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import auth from './app/middleware/auth';

const routes = new Router();

routes.post('/api/session', SessionController.store);
routes.post('/api/user', UserController.store);

routes.use(auth);

routes.put('/api/user', UserController.update);

export default routes;
