import ProductsManager from "../dao/mongo/Managers/ProductsManager.js";

const productManager = new ProductsManager();

export const getProducts = async (req, res) => {
  try {
    // Obtener parámetros de consulta
    const { page, category } = req.query;
    const products = await productManager.getProducts(page, category);
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, code, stock, category, thumbnails } = req.body;
    const productWithCode = await productsModel.findOne({ code });

    // Comprobando que no falten datos o que no estén vacíos
    if (!title || !description || !price || !code || !stock || !category || !thumbnails) {
      return res.status(400).send({ status: 'error', error: 'Datos incompletos, por favor, verifica que los datos se estén enviando correctamente' });
    }

    const existingProduct = productWithCode;
    if (existingProduct) {
      return res.status(400).send({ status: 'error', error: 'El código de producto ya está en uso' });
    }

    const product = {
      title,
      description,
      price,
      code,
      stock,
      category,
      thumbnails
    };

    const result = await productManager.addProduct(product);
    res.send({ status: "success", message: "Producto agregado correctamente", payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.pId;
    const product = await productManager.getProductById(productId);
    if (product) {
      res.send({ status: "success", message: `El producto '${product.title}', se ha cargado correctamente`, payload: product });
    } else {
      res.status(400).send({ status: "error", error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: 'Error interno del servidor' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.pId;
    const productToUpdate = req.body;
    const result = await productManager.updateProduct(productId, productToUpdate);
    console.log(result);
    res.send({ status: "success", message: "Producto actualizado con éxito" });
  } catch (error) {
    console.log(error);
    res.status(400).send('Producto no encontrado');
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.pId;
    const result = await productManager.deleteProduct(productId);
    console.log(result);
    res.send({ status: "success", message: "Su producto ha sido eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", error: 'Error interno del servidor' });
  }
};
