const {Sequelize}= require('sequelize')
const sequelize = require('../database');
const subProduct = require('./sub-products');
const product =sequelize.define('Products', {
    id:{
        primaryKey:true,
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
    },
    categoryName:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    categoryLevel:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }
},{
    freezeTableName:true,
    timestamps:false,
});
product.hasMany(subProduct,{
     foreignKey:"ProdtId"
    });
    subProduct.belongsTo(product,{
    foreignKey:"ProdtId",allowNull:false
});





module.exports = product