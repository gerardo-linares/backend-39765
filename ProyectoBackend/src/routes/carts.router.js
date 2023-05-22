import { Router } from "express";
//import CartManager from "../../managers/fs/Cart.Managers.js";
import CartsManager from "../dao/mongo/Managers/CartsManager.js";

//const cartManager = new CartManager();
const cartManager = new CartsManager();
const router = Router();

/* MongoDB */
router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({ status: "error", error: 'Error interno del servidor' })
  }
});

router.post('/', async (req, res) => {
  try {
    const { products } = req.body;

    //Validando que no se puedan enviar productos vacíos
    if (!products || products.length === 0) {
      throw new Error('No se han proporcionado productos. Por favor, verifica los datos enviados.')
    }

    // Validando si hay objetos vacíos en el arreglo de productos.
    products.forEach(product => {
      if (Object.keys(product).length === 0) {
        throw new Error('Se ha proporcionado un objeto vacío en el arreglo de productos. Por favor, verifica los datos enviados');
      };

      //Validando que los campos name y price se envien correctamente.
      if (!product.name || !product.price) {
        console.log(product.name);
        throw new Error("El 'name' y 'price' del producto deben estar indicados");
      }

      //Validando que los campos name y price sean de tipo string y number respectivamente.
      if (typeof product.name !== 'string' || typeof product.price !== 'number') {
        throw new Error("El 'name' debe ser de tipo 'String' y el 'price' de tipo 'Number'")
      }
    });

    const newCart = await cartManager.addCart({ products });
    res.status(200).send({ status: "success", cart: newCart });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.send({ status: "success", message: `El cartito '${req.params.cid}' se ha cargado con exito`, payload: cart });
    } else {
      res.status(400).send({ status: "error", error: 'Producto no encontrado, ingrese una Id valida' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message })
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = (req.params.cid);
    const pid = (req.params.pid);
    const quantity = (req.body.quantity);

    // Validando si el ID del producto es mayor que 0
    if (pid <= 0) {
      throw new Error('El Id del producto debe ser mayor que 0.');
    }

    const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
    if (updatedCart) {
      res.status(200).send({ status: "success", message: `Producto agregado correctamente al carrito '${req.params.cid}'`, payload: updatedCart })
    } else {
      res.status(400).send({ status: "error", error: error.message })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message })
  }
});






/* FS*/
/* router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({status: "error", error: error.message})
  }
}); */

/* router.post('/', async (req, res) => {
  try {
    const { products } = req.body;
    const newCart = await cartManager.addCart({ products })
    res.status(200).send({ sratus: "success", cart: newCart })
  } catch (error) {
    res.status(500).send({status: "error", error: error.message});
  }
}); */

/* router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.send({status: "success", message:`El cartito '${req.params.cid}' se ha cargado con exito`, payload: cart});
    } else {
      res.status(400).send({status: "error", error: error.message});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({status: "error", error: error.message})
  }
}); */

/* router.post('/:cid/product/:pid', async(req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);
    const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
    if (updatedCart) {
      res.status(200).send({status: "success", message: `Producto agregado correctamente al carrito '${req.params.cid}'`, payload: updatedCart})
    } else {
      res.status(400).send({status: "error", error: error.message})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({status: "error", error: error.message})
  }
}); */

export default router;