const sequelize = require('../util/database')
var Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const stockPrice = sequelize.define('stockPrice', {
    symbol: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT(9, 2)
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},
    {
        freezeTableName: true
    });


    module.exports = stockPrice;