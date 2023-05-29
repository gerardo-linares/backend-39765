import { Router } from "express";
import ProductsManager from "../dao/mongo/Managers/ProductsManager.js";
import CartsManager from "../dao/mongo/Managers/CartsManager.js";
import productsModel from "../dao/mongo/models/products.js";
import cartsModel from "../dao/mongo/models/carts.js";

const router = Router();
const productsServices = new ProductsManager();
const cartsServices = new CartsManager();

router.get("/", async (req, res) => {
  try {
    const name = "Mi Tienda Online";
    const products = await productsServices.getProducts({});

    res.render("home", { name, products, css: "home" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: 'Error interno del servidor' });
  }
});

router.get('/carts', async (req, res) => {
  const carts = await cartsServices.getCarts().lean();
  res.render('carts', { carts, css: "carts" });
});

router.get('/chat', async (req, res) => {
  res.render('chat');
});

router.get('/products', async (req, res) => {
  const { page = 1, category, sort, limit } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit) || 10,
    lean: true
  };
  const filters = {};

  if (category) {
    filters.category = category;
  }

  if (sort === 'asc') {
    options.sort = { price: 1 };
  } else if (sort === 'desc') {
    options.sort = { price: -1 };
  }

  try {
    const result = await productsModel.paginate(filters, options);
    const products = result.docs;
    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;

    res.render('products', {
      products,
      css: "products",
      page: result.page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: 'Error interno del servidor' });
  }
});

router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await productsModel.findById(productId).lean();

    if (!product) {
      res.status(404).send({ error: "Producto no encontrado. Por favor, ingrese un Id válido." });
      return;
    }

    res.render('product-details', { product, css: "product-details" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

router.get('/carts/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await cartsModel.findById(cartId).populate('products.product').lean();

    if (!cart) {
      res.status(404).send({ error: "Carrito no encontrado. Por favor, ingrese un ID válido." });
      return;
    }

    res.render('cart-details', { cart, css: "cart-details" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

router.post("/add-to-cart", async (req, res) => {
  const { productId, cartId } = req.body;

  try {
    let cart;
    if (cartId) {
      cart = await cartsModel.findById(cartId);
      if (!cart) {
        res.status(404).send({ error: "Carrito no encontrado. Por favor, ingrese un ID válido." });
        return;
      }
    } else {
      cart = new cartsModel();
    }

    const product = await productsModel.findById(productId);
    if (!product) {
      res.status(404).send({ error: "Producto no encontrado. Por favor, ingrese un ID válido." });
      return;
    }

    const existingItem = cart.products.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();

    res.redirect(`/carts/${cart._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;
