const sequelize = require('../util/database')
var Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const stocks = sequelize.define('stocks', {
    symbol: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100)
    },
    type:{
        type:DataTypes.STRING(100)
    },
    currency: {
        type: DataTypes.STRING(10)
    }
},
    {
        freezeTableName: true,
        timestampls: true
    });


    module.exports = stocks;