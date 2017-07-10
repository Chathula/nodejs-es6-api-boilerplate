/* eslint-disable no-console */

import express from 'express';

const app = express();

import constants from './config/contanats';
import './config/database';
import middlewareConfig from './config/middlewares';
import apiRoutes from './modules';

middlewareConfig(app);

app.get('/', (req, res) => {
  res.send('hello');
});

apiRoutes(app);

app.listen(constants.PORT, () => {
  console.log(`Server is running in ${constants.MODE} mode on port: ${constants.PORT}`);
});
