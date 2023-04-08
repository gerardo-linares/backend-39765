class ProductManager {

    constructor() {
        this.products = [];
    };

    addProducts = ({ title, description, price, thumbnail, code, stock }) => {


        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.info("Complete todos los campos")
            return;
        }

        const foundCode = this.products.find(e => e.code === code);
        if (foundCode) {
            console.info("El codigo ya existe")
            return;
        }

        const product = { title, description, price, thumbnail, code, stock}

        const id = this.products.length

        if (id === 0) {
            product.id = 1
        } {
            product.id = id + 1
        }

        this.products.push(product)
    };

    getProducts = () => {
        console.log(this.products)
    }

    getProductById = (searchId) => {

        if (!searchId) {
            console.error("Ingrese un ID para su busqueda")
            return;
        }

        const foundId = this.products.find(e => e.id === searchId);
        if (!foundId) {
            console.info("No se encuentra el ID ingresado")
            return;
        }

        console.log(this.products[searchId - 1])
    }
};


const product1 = new ProductManager()

//  PRODUCT TEST
const testProduct = {
    title: "product test",
    description: "desciption test",
    price: 1000,
    thumbnail: "Img test",
    code: "test123",
    stock: 5
}




// TEST METHODS
product1.getProducts() // array vacio 
product1.addProducts(testProduct); // agrega el producto
product1.getProducts() // primer producto agregado
product1.addProducts(testProduct); //  ya existe el ID 
product1.getProductById();  // no agrego ID para la busqueda
product1.getProductById(1); // muestra el objeto


