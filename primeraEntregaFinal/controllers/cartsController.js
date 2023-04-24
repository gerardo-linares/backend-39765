//Imports de clases
import {ProductManager} from '../src/productManager.js';
import {CartManager} from '../src/cartManager.js';

//Path
import path from 'path';

const pathProd = path.join(new URL('.', import.meta.url).pathname.substr(1), '..', 'db', 'products.json');



//Instancias de las clases
let myCartManager = new CartManager();
let myProductManager= new ProductManager(pathProd);

//Creacion carrito
export const createCart = async (req, res)=>{
    const cart = {
        products: []
    }
    myCartManager.addCart(cart);
    res.status(200).send('cart created');
};

//Obtengo el carrito por id
export const getCartId = async (req, res)=>{
    const cid = req.params.cid;
    const carts = await myCartManager.getCarts();
    console.log('carts', carts);
    let cart = carts.find((c) => c.id === Number(cid));
    if(cart){
        res.status(200).send(cart);
    }else{
        res.status(404).send(`Error: cart not found with id: ${cid}`);
    };
};

//Obtengo el producto por id en el carrito seleccionado por id
export const getProductsByIdCart = async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    let cart = await myCartManager.getCartById(Number(cid));
    let product = await myProductManager.getProductById(Number(pid));
    const productAdd = {
        id: product.id,
        quantity: 1
    };
    myCartManager.addToCart(cart, productAdd);
    res.status(200).send('Product added to cart');
};


