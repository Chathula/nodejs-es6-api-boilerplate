import { Router } from 'express';
import validate from 'express-validation';

import { authLocal, authJwt } from '../../services/auth.services';
import * as userController from './user.controllers';
import userValidation from './user.validation';

const routes = new Router();

routes.post('/signup', validate(userValidation.signup), userController.signUp);
routes.post('/login', authLocal, userController.login);
routes.get('/hello', authJwt, (req, res) => {
  res.send('protected');
});

export default routes;
