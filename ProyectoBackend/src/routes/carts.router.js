import { Router } from "express";
import {
  getAllCarts,
  createCart,
  getCartById,
  updateCartById,
  deleteAllProducts,
  addProductToCart,
  updateProductQuantity,
  deleteProductFromCart,
} from "../controllers/carts.controller.js";

const router = Router();

// Endpoint para obtener todos los carritos de compras
router.get("/", getAllCarts);

// Endpoint para crear un nuevo carrito de compras
router.post("/", createCart);

// Endpoint para obtener un carrito de compras por su ID
router.get("/:cid", getCartById);

// Endpoint para actualizar un carrito de compras por su ID
router.put("/:cid", updateCartById);

// Endpoint para eliminar todos los productos de un carrito de compras
router.delete("/:cid/products", deleteAllProducts);

// Endpoint para agregar un producto a un carrito de compras
router.post("/:cid/products/:pid", addProductToCart);

// Endpoint para actualizar la cantidad de un producto en un carrito de compras
router.put("/:cid/products/:pid", updateProductQuantity);

// Endpoint para eliminar un producto de un carrito de compras
router.delete("/:cid/products/:pid", deleteProductFromCart);

export default router;

// //**TEST POSTMAN

// Obtener todos los carritos:
//  GET http://localhost:8080/api/carts

// Agregar un nuevo carrito:
// POST http://localhost:8080/api/carts

// {
//   "products": [
//     {
//       "name": "Product 1",
//       "price": 10
//     },
//     {
//       "name": "Product 2",
//       "price": 20
//     }
//   ]
// }

// Obtener un carrito por su ID:
//  GET http://localhost:8080/api/carts/:cid

// Agregar un producto a un carrito:
//  POST http://localhost:8080/api/carts/:cid/product/:pid

// Eliminar un producto del carrito:
// DELETE http://localhost:8080/api/carts/:cid/products/:pid

// Eliminar todos los productos del carrito:
// DELETE http://localhost:8080/api/carts/:cid

// Actualizar el carrito con un arreglo de productos:
//  PUT http://localhost:8080/api/carts/:cid

//  {
//   "products": [
//     {
//       "name": "Updated Product 1",
//       "price": 15
//     },
//     {
//       "name": "Updated Product 2",
//       "price": 25
//     }
//   ]
// }

// Actualizar la cantidad de ejemplares de un producto en el carrito:
// PUT http://localhost:8080/api/carts/:cid/products/:pid

// {
//   "quantity": 5
// }

//TEST FILTROS//

//por categoria "hogar","figuras"
//http://localhost:8080/products/?page=1&category=hogar//
//http://localhost:8080/products/?page=1&category=figuras//

//cambios de pagina//
//pagina3//
//http://localhost:8080/products?page=3//

//limite de elementos por pagina//
//5 por pagina//
//http://localhost:8080/products?page=1&limit=5//
