const Products =require("../models/products")
const SubProducts =require("../models/sub-products")
const Sequelize = require('sequelize');

// creating the tables and inserting the records into db
const add = async(req,res)=>{
    try {
        const resp = await Products.create(req.body, {
            include: [
                {
                    model: SubProducts,
                },
            ],
        });
    res.status(200).json({
        status:"success",
        response:resp,
        message:"record inserted successfully"
    })
    } catch (error) {
        res.status(400).json({
            status:"failed...!",
            message:error.message
        })
        console.log(error.message);
    }
};

// fetching all the data in db
const getAll = async(req,res)=>{
    try {
        const resp = await Products.findAll({
             include: SubProducts,
          });
          res.status(200).json({
            status:"success",
            response:updatePromises,
            message:"record fetched successfully"
          })
    } catch (error) {
        res.status(400).json({
            status:"failed...!",
            message:error.message
        })
        console.log(error.message);
    }
};

// deleting the data in db 
const remove = async(req,res)=>{
    try {
        const resp = await SubProducts.destroy({
            where:{
            ProdtId: req.params.id
             },
          });
          if(SubProducts.ProdtId == Products.id){
            await Products.destroy({
                where:{
                    id : req.params.id
                }
            });
          }
          res.status(200).json({
            status:"success",
            response:resp,
            message:"record deleted successfully"
          })
    } catch (error) {
        res.status(400).json({
            status:"failed...!",
            message:error.message
        })
        console.log(error.message);
    }
}

// fetching the records based on condition & pagination 
const findmany= async (req,res)=>{
    try {
        let resp;
        const {limit,offset,level,name} = req.body
        // checking pagination
        if ((offset || offset === 0) && limit) {
            resp = await SubProducts
              .findAll( {
                where: Sequelize.or (
              { sub_categorylevel: { [Sequelize.Op.like]: `%${level}%` }} ,
              { sub_categoryname: { [Sequelize.Op.like]: `%${name}%` }}) ,
                limit,offset})
              
          }
          else {
            resp = await SubProducts.findAll({
                where: Sequelize.or (
                { sub_categorylevel: { [Sequelize.Op.like]: `%${level}%` }} ,
            { sub_categoryname: { [Sequelize.Op.like]: `%${name}%` }}
            )})
          }
          const count = await SubProducts.count()
          console.log(count)
        console.log(resp)
        res.status(200).json({
            status: "success",
            response: {resp,count},
            message: "fetched sucessfully",
          });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            response: null,
            message: error.message,
          });
    }

}



module.exports = {add, getAll, remove, findmany}
