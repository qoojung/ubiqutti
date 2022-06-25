const { Sequelize } = require('sequelize');

const User = require('./user');

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});
module.exports = {
  sequelize,
  User: User(sequelize),
};
