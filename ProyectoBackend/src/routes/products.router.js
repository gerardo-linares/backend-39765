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
