
//Import
const {Router} = require('express');
const productsRouter = Router();

//Imports de Controllers
const {
    getAllProducts,
    getProdById,
    addProduct,
    updateProductById,
    deleteProdById,
    }= require('../controllers/productsController.js');

//Routes
productsRouter.get('/', getAllProducts);
productsRouter.get('/:pid', getProdById);

productsRouter.post('/', addProduct);
productsRouter.put('/:pid', updateProductById);
productsRouter.delete('/:pid', deleteProdById);

//Export de routers
module.exports = productsRouter;