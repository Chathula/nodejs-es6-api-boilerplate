const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/express-es6-dev',
  JWT_SECRET: 'thisisasecret'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost:27017/express-es6-test',
  JWT_SECRET: 'thisisasecretoftest'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost:27017/express-es6-prod',
  JWT_SECRET: 'thisisasecretofprod'
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  MODE: process.env.NODE_ENV || "development"
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
};

export default {
  ...defaultConfig,
  ...envConfig(defaultConfig.MODE)
};
