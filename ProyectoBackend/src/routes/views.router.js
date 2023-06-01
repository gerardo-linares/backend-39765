import { Router } from "express";
import ProductsManager from "../dao/mongo/Managers/ProductsManager.js";
import CartsManager from "../dao/mongo/Managers/CartsManager.js";
import productsModel from "../dao/mongo/models/products.js";
import cartsModel from "../dao/mongo/models/carts.js";

const router = Router();
const productsServices = new ProductsManager();
const cartsServices = new CartsManager();

/* Endpoint para la página principal */
router.get("/", async (req, res) => {
  try {
    const name = "Mi Tienda Online";
    // Obtener la lista de productos
    const products = await productsServices.getProducts({});

    res.render("home", { name, products, css: "home" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: 'Error interno del servidor' });
  }
});

/* Endpoint para la página de carritos */
router.get('/cartss', async (req, res) => {
  // Obtener la lista de carritos
  const carts = await cartsServices.getCarts().lean();
  res.render('carts', { carts, css: "carts" });
});

/* Endpoint para la página de chat */
router.get('/chat', async (req, res) => {
  res.render('chat');
});

/* Endpoint para la página de productos */
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
    // Obtener la lista de productos paginada y filtrada
    const result = await productsModel.paginate(filters, options);
    const products = result.docs;
    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;
    const cartId = req.session.cartId;

    res.render('products', {
      products,
      css: "products",
      page: result.page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      user:req.session.user,
      cartId: cartId
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: 'Error interno del servidor' });
  }
});

/* Endpoint para la página de detalles de un producto */
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Obtener los detalles de un producto por su ID
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

/* Endpoint para la página de detalles de un carrito */
router.get('/carts/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    // Obtener los detalles de un carrito por su ID
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

/* Endpoint para agregar un producto a un carrito */
router.post("/add-to-cart", async (req, res) => {
  const { productId } = req.body;

  try {
    let cart;

    if (req.session.cartId) {
      // Si hay un ID de carrito en la sesión, buscar el carrito existente
      cart = await cartsModel.findById(req.session.cartId);
      if (!cart) {
        res.status(404).send({ error: "Carrito no encontrado. Por favor, ingrese un ID válido." });
        return;
      }
    } else {
      // Si no hay un ID de carrito en la sesión, crear uno nuevo
      cart = new cartsModel();
      req.session.cartId = cart._id; // Guardar el ID del nuevo carrito en la sesión
    }

    // Obtener el producto por su ID
    const product = await productsModel.findById(productId);
    if (!product) {
      res.status(404).send({ error: "Producto no encontrado. Por favor, ingrese un ID válido." });
      return;
    }

    const existingItem = cart.products.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // Agregar el producto al carrito con una cantidad de 1
      cart.products.push({ product: productId, quantity: 1 });
    }
    await cart.save();

    res.redirect(`/carts/${cart._id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

router.get('/register', async (req, res) => {
  res.render('register', {css: 'register'});
});

router.get('/login', async (req, res) => {
  res.render('login',{css:'login'});
});


export default router;
