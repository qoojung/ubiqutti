const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('users', {
  acct: {
    type: DataTypes.STRING(128),
    primaryKey: true,
  },
  pwd: DataTypes.STRING(128),
  fullname: DataTypes.STRING(128),
});
