/* eslint-disable no-console */

import mongoose from 'mongoose';

import constants from './contanats';

mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGO_URL, {
    useNewUrlParser: true 
  });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('MongoDB is Running...'))
  .on('error', (err) => {
    if (err) {
      throw err;
    } else {
      console.log('something wrong in db connection');
    }
  });
