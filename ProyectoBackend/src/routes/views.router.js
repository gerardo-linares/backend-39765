import { Router } from "express";
//import ProductManager from "../../src/dao/fileSystem/Managers/ProductManagers.js";
import ProductsManager from "../dao/mongo/Managers/ProductsManager.js";
import CartsManager from "../dao/mongo/Managers/CartsManager.js";



const router = Router();

//const productManager = new ProductManager()
const productsServices = new ProductsManager();
const cartsServices = new CartsManager();

/* MongoDb */
router.get('/', async (req, res) => {
  const products = await productsServices.getProducts();
  res.render('products', {products, css:"products"});
});

router.get('/carts', async (req, res) => {
  const carts = await cartsServices.getCarts();
  res.render('carts',{carts, css:"carts"});
  });

router.get('/chat', async (req,res) => {
  res.render('chat');
})


/* FS */
/* router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', {
    name: 'ecommerce',
    css: 'home',
    products: products
  });
}); */

/* router.get('/realtimeproducts', async (req, res) => {
  res.render('realTimeProducts', {
    name: 'ecommerce',
    css: 'realTimeProducts'
  });
}); */

export default router;