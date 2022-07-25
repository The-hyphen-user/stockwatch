const sequelize = require("../util/database");
var Sequelize = require("sequelize");
const { DataTypes } = Sequelize;

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
    },
    wealth: {
      type: DataTypes.FLOAT(13, 2),
    },
    privacy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestampls: true,
  }
);

module.exports = user;
