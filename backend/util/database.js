var Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS, {
    dialect: 'mysql'
})






module.exports = sequelize