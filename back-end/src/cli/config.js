require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './dbtest.db',
  },
  production: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
