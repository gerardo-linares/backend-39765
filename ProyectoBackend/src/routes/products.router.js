import { Router } from "express";
import {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

/* Endpoint para obtener la lista de productos */
router.get("/", getProducts);

/* Endpoint para agregar un nuevo producto */
router.post("/", addProduct);

/* Endpoint para obtener un producto por su ID */
router.get("/:pId", getProductById);

/* Endpoint para actualizar un producto por su ID */
router.put("/:pId", updateProduct);

/* Endpoint para eliminar un producto por su ID */
router.delete("/:pId", deleteProduct);

export default router;

/* FileSystem */
/* router.get('/', async (req, res) => {
  try {
    let products;
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      products = await productManager.getProducts(limit);
    } else {
      products = await productManager.getProducts();
    }
    res.status(200).send({ status: "success", payload: products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: 'Error interno del servidor' });
  }
}); */

/* router.post('/', async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails, status } = req.body;
    const newProduct = await productManager.addProduct({ title, description, price, code, stock, category, thumbnails, status });
    const products = await productManager.getProducts();
    req.io.emit('products', products);
    res.status(200).send({ status: "success", message: "Producto agregado correctamente", payload: newProduct });
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}); */

/* router.get('/:pId', async (req, res) => {
  try {
    const productId = parseInt(req.params.pId);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.send({ status: "success", message: `El producto '${req.params.pId}' - '${product.title}', se ha cargado correctamente`, payload: product });
    } else {
      res.status(400).send('Producto no encontrado');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status:"error", error: "Error interno del servidor" })
  }
}); */

/* router.put('/:pId', async (req, res) => {
  const updates = req.body;
  delete updates.id;

  try {
    const productId = parseInt(req.params.pId);
    const product = await productManager.getProductById(productId)
    if (product) {
      const updatedProduct = await productManager.updateProduct(productId, updates);
      res.status(200).send({ status: "success", message: `Producto '${req.params.pId}' actualizado correctamente`, payload: updatedProduct })
    } else {
      res.status(400).send('Producto no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}); */

/* router.delete('/:pId', async (req, res) => {
  try {
    const productId = parseInt(req.params.pId);
    const product = await productManager.getProductById(productId);
    if (product) {
      await productManager.deleteProduct(productId);
      const products = await productManager.getProducts();
      req.io.emit('products', products);
      res.status(200).send({ status: "success", message: `El producto '${product.title}' ha sido eliminado con éxito`, payload: product });
    } else {
      res.status(404).send({ status: "error", error: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", error: error.message });
  }
}); */
