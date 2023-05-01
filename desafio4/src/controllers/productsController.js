//Import de clase
const ProductManager = require('../productManager');

//Path
const path = require('path');
const ruta = path.join(`${__dirname}/../../src/db/products.json`);

//Instancia de clase
let adminProduct = new ProductManager(ruta);

//Administrador = true
const admin = true;

//Obtengo todos los productos y limito cantidad de productos con "limit"
const getAllProducts = async (req, res)=>{
    const products = await adminProduct.getProducts();
    const limit = req.query.limit;
    let respuesta = products;
    if (limit && !isNaN(Number(limit))) {
        respuesta = products.slice(0, limit);
    };
    res.status(200).send(respuesta);
};

//Obtengo el producto por id
const getProdById = async (req, res)=>{
    try {
        const {pid} = req.params;
        const product = await adminProduct.getProductById(Number(pid));
        res.status(200).send(product);
    } catch (error) {
        throw new Error(error);
    };
};

//Agrego un producto
const addProduct = async (req, res)=>{
    if(admin){
        try{
            const product = {
                title: req.body.title,
                description: req.body.description,
                code: req.body.code,
                price: req.body.price,
                status: true,
                stock: req.body.stock,
                category: req.body.category,
                thumbnails: [req.body.thumbnails],
            }
            await adminProduct.addProduct(product);
            res.status(200).send('Product Added');
        }catch(error){
            throw new Error(error);
        };
    };
};

//Actualizo producto por id
const updateProductById = async (req, res)=>{
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
    await adminProduct.updateProduct(Number(pid), productUpdate);
    res.status(200).send('Product Update');
};

//Elimino un producto por id
const deleteProdById = async(req, res)=>{
    const {pid} = req.params
    await adminProduct.deleteProduct(Number(pid));
    res.status(200).send(`Product with id: ${pid} deleted`);
};

//Exports de funciones
module.exports = {
                    getAllProducts,
                    getProdById,
                    addProduct,
                    updateProductById,
                    deleteProdById };