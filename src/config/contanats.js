const devConfig = {
  MONGO_URL: 'mongodb://localhost/express-es6-dev',
  JWT_SECRET: 'thisisasecret'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/express-es6-test'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/express-es6-prod'
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
