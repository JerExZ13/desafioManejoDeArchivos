import express from "express";
import { param, validationResult } from "express-validator";
import CartManager from "../models/CartManager.js";

const router = express.Router();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  try {
    const allCarts = await cartManager.getCarts();
    res.json(allCarts);
  } catch (error) {
    console.error("Error al obtener todos los carritos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.addCart();
    res.json(newCart);
  } catch (error) {
    console.error("Error al crear el carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:cid", param("cid").isNumeric(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(parseInt(cid, 10));
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post(
  "/:cid/product/:pid",
  param("cid").isNumeric(),
  param("pid").isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { cid, pid } = req.params;
      const quantity = 1;
      const updatedCart = await cartManager.addProductToCart(
        parseInt(cid, 10),
        parseInt(pid, 10),
        quantity
      );
      res.json(updatedCart);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);
router.put("/:cid", param("cid").isNumeric(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { cid } = req.params;
    const updatedCartData = req.body;
    const updatedCart = await cartManager.updateCart(
      parseInt(cid, 10),
      updatedCartData
    );
    res.json(updatedCart);
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
router.delete("/:cid", param("cid").isNumeric(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { cid } = req.params;
    const result = await cartManager.deleteCart(parseInt(cid, 10));
    res.json({ message: result });
  } catch (error) {
    console.error("Error al eliminar el carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
