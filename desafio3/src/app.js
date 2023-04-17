import express from 'express';
import { ProductManager } from './Pro/ProductManager.js';


const app = express();
const productManager = new ProductManager('./Pro/db.json');

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    const result = limit ? products.slice(0, limit) : products;
    res.json({ products: result });
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json({ product });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


//TESTS/
//**llamar todos los productos */ = http://localhost:8080/products

//**llamar producto por ID */ = http://localhost:8080/products/3
