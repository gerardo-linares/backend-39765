import ProductsManager from "../dao/mongo/Managers/ProductsManager.js";

const productManager = new ProductsManager();

//links/
export const getProducts = async (req, res) => {
  const { page = 1, category, sort, limit } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit) || 5,
    lean: true,
  };
  const filters = {};

  if (category) {
    filters.category = category;
  }

  if (sort === "asc") {
    options.sort = { price: 1 };
  } else if (sort === "desc") {
    options.sort = { price: -1 };
  }

  try {
    // Obtener la lista de productos paginada y filtrada
    const result = await productManager.getPaginatedProducts(filters, options);
    const products = result.docs;
    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;

    res.send({
      products,
      page: result.page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "error", error: "Error interno del servidor" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, code, stock, category, thumbnails } =
      req.body;
    const productWithCode = await productManager.getProductByCode({ code });

    // Comprobando que no falten datos o que no estén vacíos
    if (
      !title ||
      !description ||
      !price ||
      !code ||
      !stock ||
      !category ||
      !thumbnails
    ) {
      return res.status(400).send({
        status: "error",
        error:
          "Datos incompletos, por favor, verifica que los datos se estén enviando correctamente",
      });
    }

    const existingProduct = productWithCode;
    if (existingProduct) {
      return res.status(400).send({
        status: "error",
        error: "El código de producto ya está en uso",
      });
    }

    const product = {
      title,
      description,
      price,
      code,
      stock,
      category,
      thumbnails,
    };

    const result = await productManager.addProduct(product);
    res.send({
      status: "success",
      message: "Producto agregado correctamente",
      payload: result,
    });
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
      res.send({
        status: "success",
        message: `El producto '${product.title}', se ha cargado correctamente`,
        payload: product,
      });
    } else {
      res
        .status(400)
        .send({ status: "error", error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: "error", error: "Error interno del servidor" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.pId;
    const productToUpdate = req.body;
    const result = await productManager.updateProduct(
      productId,
      productToUpdate
    );
    console.log(result);
    res.send({ status: "success", message: "Producto actualizado con éxito" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Producto no encontrado");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.pId;
    const result = await productManager.deleteProduct(productId);
    console.log(result);
    res.send({
      status: "success",
      message: "Su producto ha sido eliminado con éxito",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "error", error: "Error interno del servidor" });
  }
};
