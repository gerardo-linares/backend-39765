//Import
import {Router} from 'express';
export const cartsRouter = Router();

//Imports de Controllers
import {
    createCart,
    getCartId,
    getProductsByIdCart
} from '../controllers/cartsController.js'

//Routes
cartsRouter.post('/', createCart);
cartsRouter.get('/:cid', getCartId);
cartsRouter.post('/:cid/product/:pid', getProductsByIdCart )


