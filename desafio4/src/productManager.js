//Imports
const path = require('path');
const fs = require('fs/promises');

//Path products.json
const pathJson = path.join(`${__dirname}/db/products.json`);
//console.log('pathjson', pathJson);

class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
    }
    //Metodo getProducts para obtener todos los productos
    getProducts = async ()=>{
        try {
            //Productos del archivo products.json
            const content = await fs.readFile(this.path);
            //Verifico si hay productos en el archivo products.json
            if(content.length === 0){
                console.log('Products no found');
                return content;
            } 
            return JSON.parse(content);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
    //Metodo para agregar un producto
    addProduct = async (product)=>{
        try {
            console.log('product',product);
            this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const idGen = ()=>{
                let id = 1;
                const lastProd = this.products[this.products.length - 1]
                if(lastProd){ id= lastProd.id + 1}
                return id;
                };
            idGen();

            // Validacion de datos recibidos
            if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category /*|| !product.thumbnails*/) {
                console.log('Todos los campos son obligatorios');
            }else if(this.products.find(element => element.code === product.code)){
                console.error(`Error: Code repetido. El code ${product.code} ya esta en uso`);
            }else{
                this.products.push({id: idGen() ,...product});
                console.log(`Product ${product.title} add`);
                await fs.writeFile(pathJson, JSON.stringify(this.products, null, 2));
            }
        } catch (error) {
            console.error('Error: No se pudo agregar el producto');
            throw new Error(error);
        }
    };
    //Metodo getProductById para obtener los productos por su id
    getProductById = async (id)=>{
        try {
            let fileProducts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            //Busqueda de producto por id
            let productFound = fileProducts.find(product => product.id === Number(id));
            if(productFound){
                console.log(`Product with id:${id} was founded`);
                return productFound;
            }else{
                console.log(`Error: Product with id: ${id}, not founded`);
            };
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };
    //Metodo para actualizar un producto
    updateProduct = async(id, data) =>{
        try {
            let fileProducts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            let productFoundIndex = fileProducts.findIndex(prod => prod.id === Number(id));
            if(productFoundIndex < 0){
                return `Product id: ${id}, not found`;
            }else{
                fileProducts[productFoundIndex] = {id: id, ...data};
                await fs.writeFile(this.path, JSON.stringify(fileProducts,null,2));
                console.log("Product update Succefully");
            }
        } catch (error) {
            console.log(`Error: the Product wasn't update`);
            throw new Error(error);
        }
    };
    //Metodo para eliminar un producto por su id
    deleteProduct = async (id)=>{
        try {
            if(!id){
                throw new Error('Missing Id');
            }
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const findProducts = products.find(product => product.id == id);
            if(findProducts){
                let index = products.indexOf(findProducts);
                products.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log(`Product Id: ${id} deleted`); 
            }else{
                throw Error (`Product with id: ${id} doesn't exist`);
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        };
    };
};

// Export de la clase ProductManager
module.exports = ProductManager



