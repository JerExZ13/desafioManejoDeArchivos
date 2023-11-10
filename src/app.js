import express from "express";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
const port = 8080;

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
