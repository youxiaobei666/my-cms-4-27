const config = {
  development: {
    baseUrl: '/api',
  },
  production: {
    baseUrl: 'http:/localhost:3001',
  },
};

export default config[process.env.NODE_ENV || 'development'];