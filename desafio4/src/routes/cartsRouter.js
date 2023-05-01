//Import
const {Router} = require('express');
const cartsRouter = Router();

//Imports de Controllers
const {
    createCart,
    getCartId,
    getProductsByIdCart
} = require('../controllers/cartsController.js')

//Routes
cartsRouter.post('/', createCart);
cartsRouter.get('/:cid', getCartId);
cartsRouter.post('/:cid/product/:pid', getProductsByIdCart )

//Export routers
module.exports = cartsRouter;