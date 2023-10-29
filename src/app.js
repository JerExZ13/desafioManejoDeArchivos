import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();
const port = 8080;

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit, 10));
      return res.json(limitedProducts);
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});
app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductsById(parseInt(pid, 10));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
