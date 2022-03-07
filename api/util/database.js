const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const db = new Sequelize({
  host: process.env.DB_HOST, // localhost
  username: process.env.DB_USER, // postgres
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB, // example
  dialect: 'postgres',
  logging: false
});

module.exports = { db };
