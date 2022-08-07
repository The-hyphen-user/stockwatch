const sequelize = require("../util/database");
var Sequelize = require("sequelize");
const { DataTypes } = Sequelize;


const userRevenue = sequelize.define(
    "userRevenue",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull: false,
        },
        wealth: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestampls: true,
    }
);

module.exports = userRevenue;