
//Import
import {Router} from 'express';
export const productsRouter = Router();

//Imports de Controllers
import {
    getAllProducts,
    getProdById,
    addProduct,
    updateProductById,
    deleteProdById,
    } from '../controllers/productsController.js';

//Routes
productsRouter.get('/', getAllProducts);
productsRouter.get('/:pid', getProdById);

productsRouter.post('/', addProduct);
productsRouter.put('/:pid', updateProductById);
productsRouter.delete('/:pid', deleteProdById);


