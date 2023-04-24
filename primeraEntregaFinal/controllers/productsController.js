//Import de clase
import {ProductManager} from '../src/productManager.js';

//Path
import path from 'path';

const ruta = path.join(new URL('.', import.meta.url).pathname.substr(1), '..', 'db', 'products.json');


//Instancia de clase
let myProductManager = new ProductManager(ruta);

//Administrador = true
const admin = true;

//Obtengo todos los productos y limito cantidad de productos con "limit"
export const getAllProducts = async (req, res)=>{
    const products = await myProductManager.getProducts();
    const limit = req.query.limit;
    let respuesta = products;
    if (limit && !isNaN(Number(limit))) {
        respuesta = products.slice(0, limit);
    };
    res.status(200).send(respuesta);
};

//Obtengo el producto por id
export const getProdById = async (req, res)=>{
    try {
        const {pid} = req.params;
        const product = await myProductManager.getProductById(Number(pid));
        res.status(200).send(product);
    } catch (error) {
        throw new Error(error);
    };
};

//Agrego un producto
export const addProduct = async (req, res)=>{
    if(admin){
        const products = await myProductManager.getProducts();
        console.log(products.length);
        //Funcion Id Autoincrementable
        const idGen = ()=>{
        let id = 1;
        const lastProd = products[products.length - 1]
        if(lastProd){ id= lastProd.id + 1}
        return id;
        };
        try{
            const product = {
                id: idGen(),
                title: req.body.title,
                description: req.body.description,
                code: req.body.code,
                price: req.body.price,
                status: true,
                stock: req.body.stock,
                category: req.body.category,
                thumbnails: [req.body.thumbnails],
            }
            await myProductManager.addProduct(product);
            res.status(200).send('Product Added');
        }catch(error){
            throw new Error(error);
        };
    };
};

//Actualizo producto por id
export const updateProductById = async (req, res)=>{
    const {pid} = req.params;
    const productUpdate = {
        title: req.body.title,
        description: req.body.description,
        price: Number(req.body.price),
        code: req.body.code,
        status: true,
        stock: Number(req.body.stock),
        category: req.body.category,
        thumbnails: [req.body.thumbnails]
    };
    await myProductManager.updateProduct(Number(pid), productUpdate);
    res.status(200).send('Product Update');
};

//Elimino un producto por id
export const deleteProdById = async(req, res)=>{
    const {pid} = req.params
    await myProductManager.deleteProduct(Number(pid));
    res.status(200).send(`Product with id: ${pid} deleted`);
};

