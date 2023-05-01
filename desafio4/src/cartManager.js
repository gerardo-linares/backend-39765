
//Import
const fs = require('fs/promises');
const path = require('path');
const pathJsonCarts = path.join(`${__dirname}/db/carts.json`);


class CartManager{
    static id = 0;

    constructor(){
        this.id = CartManager.id++;
    }

    //Metodo para obtener los carritos
    getCarts = async () =>{
        const fileContent = await fs.readFile(pathJsonCarts, 'utf-8');
        const fileContentParse = JSON.parse(fileContent);
        try {
            if(fileContentParse.length === 0){
                console.log('Not carts found');
            }
            return fileContentParse;
        } catch (error) {
            console.log('Error: Not carts found');
            throw new Error(error);
        }
    }

    //Metodo para agregar un carrito
    addCart = async (cart)=>{
        const fileContent = await fs.readFile(pathJsonCarts, 'utf-8');
        const fileContentParse = JSON.parse(fileContent);
        let newCart = { id: CartManager.id++, ...cart};
        let idUsed = await fileContentParse.some((c) => c.id === newCart.id)
        try {
            if(idUsed){
                let arrayCid = fileContentParse.map(cart => [cart.id]).flat();
                let cidMayor = Math.max(...arrayCid);
                newCart.id = cidMayor + 1;
                fileContentParse.push(newCart);
            }else{
                fileContentParse.push(newCart);
            };
            console.log('cart Added');
            await fs.writeFile(pathJsonCarts, JSON.stringify(fileContentParse, null, 2));
        } catch (error) {
            console.error('Error: can not product added');
            throw new Error(error);
        };
    };

    //Metodo para agregar un producto al carrito
    addToCart = async (cart, product)=>{
        const fileContent = await fs.readFile(pathJsonCarts, 'utf-8');
        const fileContentParse = JSON.parse(fileContent);
        try {
            let cartFoundIndex = fileContentParse.findIndex((c)=> c.id === cart.id)
            let productFoundIndex = fileContentParse[cartFoundIndex].products.findIndex((p)=> p.id === product.id);
            let productNotExist =true;

            if(fileContentParse[cartFoundIndex].products[productFoundIndex]){
                fileContentParse[cartFoundIndex].products[productFoundIndex].quantity = fileContentParse[cartFoundIndex].products[productFoundIndex].quantity + 1;
                await fs.writeFile(pathJsonCarts, JSON.stringify(fileContentParse, null, 2));
            }else if(productNotExist){
                fileContentParse[cartFoundIndex].products.push(product);
                await fs.writeFile(pathJsonCarts, JSON.stringify(fileContentParse, null, 2));
                console.log('product added to cart');
            }
        } catch (error) {
            console.log(`Error: product not added to cart with ${cart.id}`);
            throw new Error(error);
        };
    };

    //Metodo para obtener el carrito por id
    getCartById = async (id)=>{
        const fileContent = JSON.parse(await fs.readFile(pathJsonCarts, 'utf-8'));
        let cartFound = fileContent.find(cart => cart.id === id);
        try {
            if(cartFound){
                console.log(`Cart with id: ${id} found`);
                console.log('cartfound',cartFound);
                return cartFound;
            }else{
                console.log(`Error: not cart found id: ${id}`);
            };
        } catch (error) {
            console.log(`Error: not cart found id: ${id}`);
            throw new Error(error);
        };
    };
};

//Export de CartManager
module.exports = CartManager;