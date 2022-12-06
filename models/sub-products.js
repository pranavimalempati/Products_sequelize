const Sequelize = require('sequelize');
const sequelize = require('../database');
const subProduct =sequelize.define('SubProducts', {
    sub_id:{
        primaryKey:true,
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
    },
sub_categoryname:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
sub_categorylevel:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName:true,
    timestamps:false,
})



module.exports = subProduct