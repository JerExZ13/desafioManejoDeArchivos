import express from "express";
import http from "http";
import { Server } from "socket.io";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 8080;

app.use(express.json());
console.log("Antes de configurar las rutas");
app.use("/api/products", productRoutes(io));
console.log("Después de configurar las rutas de productos");
app.use("/api/carts", cartRoutes(io)); // Pasa la instancia de io a tus rutas

console.log("Después de configurar las rutas de carritos");

io.on("connection", (socket) => {
  console.log("Usuario conectado");
});

server.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
