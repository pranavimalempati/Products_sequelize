const express= require('express')
const product=require('./models/products')
const subProduct =require('./models/sub-products')
const router =require('./router/product_router')
const sequelize=require('./database')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const main =express()
main.use(bodyParser.urlencoded({extended:true}))
main.use(bodyParser.json())
main.use(cors())
sequelize.sync()
async function run(){
        await sequelize.authenticate()
        console.log('connected to the database')
        main.use('/',router)
        main.listen(process.env.PORT, () => {
            console.log('server running at port',process.env.PORT);
          });
    }
run()
