import express from "express";
import { body, param, validationResult } from "express-validator";
import ProductManager from "../models/ProductManager.js";

const router = express.Router();

const setupProductRoutes = (io) => {
  const productManager = new ProductManager(io);

  router.get("/", async (req, res) => {
    try {
      const { limit } = req.query;
      const products = await productManager.getProducts(limit);
      res.json(products);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  router.post(
    "/",
    [
      body("title").notEmpty(),
      body("description").notEmpty(),
      body("code").notEmpty(),
      body("price").isNumeric(),
      body("stock").isInt(),
      body("category").notEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const product = req.body;
        const newProduct = await productManager.addProduct(product);
        res.json(newProduct);
      } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  );

  router.put(
    "/:pid",
    [
      param("pid").isInt(),
      body("title").optional().notEmpty(),
      body("description").optional().notEmpty(),
      body("code").optional().notEmpty(),
      body("price").optional().isNumeric(),
      body("stock").optional().isInt(),
      body("category").optional().notEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { pid } = req.params;
        const updatedProduct = req.body;
        const product = await productManager.updateProduct(
          parseInt(pid, 10),
          updatedProduct
        );
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: "Producto no encontrado" });
        }
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  );

  router.delete("/:pid", param("pid").isInt(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { pid } = req.params;
      const productDeleted = await productManager.deleteProduct(
        parseInt(pid, 10)
      );
      if (productDeleted) {
        res.json(productDeleted);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  return router;
};

export default setupProductRoutes;
