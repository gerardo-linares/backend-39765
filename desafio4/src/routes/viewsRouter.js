//Imports
const { Router } = require('express');
const ProductManager = require('../productManager');
const viewRouter = Router();
const path = require('path');
const pathJson = path.join(`${__dirname}/../db/products.json`);

//Instance Class
const adminProducts = new ProductManager(pathJson);

let allProducts = [];

const fetchProducts = async ()=>{
    try {
        allProducts = await adminProducts.getProducts();
        //console.log('allproducts', allProducts);
    } catch (error) {
        console.log('Error: product not found');
        throw Error(error);
    }
    return allProducts;
}
fetchProducts();


viewRouter.get('/', async (req, res)=>{
    res.status(200).render('home', {products: allProducts});
}) 

viewRouter.get('/realtimeproducts', async(req, res)=>{
    res.status(200).render('realtimeproducts', {products : allProducts})
})

module.exports = viewRouter;