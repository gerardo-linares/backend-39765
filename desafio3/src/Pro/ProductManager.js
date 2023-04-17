import fs from 'fs';

export class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    };


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



    // Methods for FS

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
        id = Number(id);
        try {
            const products = await this.#checkID(id)
            if (!products) {
                return {status:'error', message: `Product not found. ID: ${id}`};
            }
            const product = products.find(product => product.id === id)
            return {status:'success', product: product};
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

