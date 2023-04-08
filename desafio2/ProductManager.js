const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    };

    // Private methods


    #validateCodeProduct = async (obj) => {
        let validateCode = this.products.find(property => property.code === Object.values(obj)[4]);
        if (validateCode) return console.log(`Could not add the product: "${obj.title}", its code is repeated: "${obj.code}" already exists`)
        await this.#addId(obj);
    };


    #addId = async (obj) => {
        (this.products.length > 0)
            ? obj.id = this.products[this.products.length - 1].id + 1
            : obj.id = 1;
        this.products.push(obj)
        await this.#saveProductsFS();

    };

    #checkID = async (id) => {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            const parseProducts = JSON.parse(getFileProducts);

            const findObj = parseProducts.find(product => product.id === id);
            if (!findObj) return null;
            return parseProducts;
        }

        catch (err) {
            console.log(err);
        }

    };

    // Methods for Fyle System

    #saveProductsFS = async () => {
        try {
            const toJSON = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, toJSON)
            return;
        }
        catch (err) {
            return console.log(err);

        }
    };

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            try {
                const readJSON = await fs.promises.readFile(this.path, 'utf-8')
                console.log(`These are all the products:\n`, JSON.parse(readJSON));
                return JSON.parse(readJSON)
            }
            catch (err) {
                console.log(err);
                return [];
            }
        }
        console.log(`The file does not exist`);
        return [];

    };

    getProductById = async (id) => {
        try {
            const products = await this.#checkID(id)
            if (!products) {
                return console.log(`Product not found. ID: ${id}`);
            }
            return console.log(`The product is:`, products[id - 1]);
        }
        catch (err) {
            return console.log(err);
        }

    };

    updateProduct = async (pid, updateObject) => {
        try {
            const productsOfFS = await this.#checkID(pid)

            this.products = productsOfFS.map(element => {
                if(element.id == pid){
                    element = Object.assign(element, updateObject);
                return element
                }
                return element
            })


            this.#saveProductsFS();
            return console.log(`The product was successfully updated:`, this.products);
        }
        catch (err) {
            return console.log(err);
        }


    }

    deleteProduct = async (id) => {

        try {
            const products = await this.#checkID(id)
            if (!products) return console.log(`Product not found. ID: ${id}`);

            products.forEach(element => {
                if(element.id !== id){
                    this.products.push(element)
                }
            })

            this.#saveProductsFS()
            return console.log(`the product ID:"${id}" has been successfully removed`);;
        }
        catch (err) {
            return console.log(err);
        }


    }

    // Public methods

    addProduct = async (title, description, price, thumbail, code, stock) => {
        this.products = await this.getProducts()
        console.log(this.products)
        const product = {
            title,
            description,
            price,
            thumbail,
            code,
            stock
        }

        console.log(`adding product ${product.title}...`);

        (Object.values(product).every(property => property))
            ? this.#validateCodeProduct(product)
            : console.log('Product could not be added, is not complete');
    };

};




const productsInstance = new ProductManager('./db.json');



//TESTS//



// * AGREGA LOS PRODUCTOS AL db.jason *


const test = async () => {
    // await productsInstance.addProduct("Lampara de Monos", "Lampara impresa en 3D, Material PLA, 6mm x 16mm - Disponible en varios colores", 4000, "https://i.postimg.cc/nryMFSN7/personalizado-monkey.jpg", 2121, 12)

    // await productsInstance.addProduct("Lampara Articulada", "Lampara impresa en 3D, Material PLA, 6mm x 16mm - Disponible en varios colores", 4500, "https://i.postimg.cc/SQJdDZ7G/personalizado-lamp.webp", 2122, 10)

    // await productsInstance.addProduct("Wolverine", "Figura impresa en 3D, Material PLA, 6mm x 12mm - Sin pintar", 3500, ".https://i.postimg.cc/2jM0JSwB/coleccion-wolverine.jpg", 2123, 20)


    // await productsInstance.addProduct("Spiderman", "Figura impresa en 3D, Material PLA, 6mm x 12mm - Sin pintar", 3500, "https://i.postimg.cc/0QNJc9SW/coleccion-spiderman.jpg", 2124, 20)


    // await productsInstance.addProduct("Cuadro de Tiburones", "Cuadro impreso en 3D, Material PLA, 200mm x 200mm - Disponible en varios colores", 320, "https://i.postimg.cc/c4Ccrv2L/deco-sharks.jpg", 2125, 11)

    // await productsInstance.addProduct("Cuadro de Montañas", "Cuadro impreso en 3D, Material PLA, 200mm x 200mm - Disponible en varios colores", 1300, "https://i.postimg.cc/RFPHBRMQ/deco-mountains.jpg", 2126, 11)





    // * MUESTRA LOS PRODUCTOS DESDE EL db.json **

    // await productsInstance.getProducts()




    // * MUESTRA EL PRODUCTO POR EL ID  *

    //await productsInstance.getProductById(3)
    //await productsInstance.getProductById(2)





    // * ACTUALIZA EL PRODUCTO POR EL ID DESDE *

    // await productsInstance.updateProduct(2, {
    //     "title": "Lampara IronMan",
    //     "description": "Lampara impresa en 3D, Material PLA, 6mm x 16mm - Disponible en varios colores",
    //     "price": 7000,
    //     "thumbail": "./img/Ironman",
    //     "code": 2727,
    //     "stock": 5,
    // },)





    // * ELIMINA EL PRODUCTO POR ID  *

  // await productsInstance.deleteProduct(2)
};

test();