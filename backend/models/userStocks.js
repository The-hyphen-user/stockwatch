const sequelize = require("../util/database");
var Sequelize = require("sequelize");
const { DataTypes } = Sequelize;

const userStocks = sequelize.define(
  "userStocks",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    ticker: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestampls: true,
  }
);

module.exports = userStocks;
