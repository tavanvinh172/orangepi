const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  // email: {
  //   type: DataTypes.STRING,
  //   unique: true,
  // },
  password: {
    type: DataTypes.STRING,
  },
});
