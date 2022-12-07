
const product = require('../controller/products_controller')

const router =require('express').Router()
router.post('/create',product.add)
router.get('/get',product.getAll)
router.delete('/delete/:id',product.remove)
router.post('/find',product.findmany)




module.exports = router
