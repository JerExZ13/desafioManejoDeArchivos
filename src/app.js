import express from "express";
import http from "http";
import { Server } from "socket.io";
import exphbs from "express-handlebars";
import { fileURLToPath } from "url";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 8080;

const hbs = exphbs.create({
  defaultLayout: "home",
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/api/products", productRoutes(io));
app.use("/api/carts", cartRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

app.get("realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

server.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
