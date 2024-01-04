require("dotenv").config();
module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'datingDB',
    host: '127.0.0.1',
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};