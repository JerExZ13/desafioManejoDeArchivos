import { promises as fsPromises } from "fs";

export default class ProductManager {
  constructor(io) {
    this.path = "./src/data/Products.json";
    this.io = io;
  }

  getProducts = async () => {
    try {
      await fsPromises.access(this.path);
      const data = await fsPromises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      return result;
    } catch (error) {
      if (error.code === "ENOENT") {
        await fsPromises.writeFile(this.path, "[]");
        return [];
      }
      console.error("Error al obtener los productos:", error.message);
      return [];
    }
  };

  addProduct = async ({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  }) => {
    try {
      const products = await this.getProducts();
      if (!Array.isArray(products)) {
        console.error("El archivo no contiene una lista de productos válida");
        return;
      }
      if (!title || !description || !code || !price || !stock || !category) {
        console.error("Todos los campos son obligatorios");
        return;
      }
      const productCode = products.findIndex((prod) => prod.code === code);
      if (productCode !== -1) {
        console.log(`Ya existe un producto con el code: ${code}`);
        return;
      }
      const newProduct = {
        id: products.length === 0 ? 1 : products[products.length - 1].id + 1,
        title,
        description,
        code,
        price,
        status: status || true,
        stock,
        category,
        thumbnails: thumbnails || [],
      };

      products.push(newProduct);

      await fsPromises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );

      this.io.emit("actualizarProductos", await this.getProducts());

      return newProduct;
    } catch (error) {
      console.error("Error al agregar el producto:", error.message);
      throw error;
    }
  };

  getProductsById = async (id) => {
    let products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    return product ? product : null;
  };

  updateProduct = async (id, updatedFields) => {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        const originalProduct = products[productIndex];
        const updatedProduct = {
          ...originalProduct,
          ...updatedFields,
          id: originalProduct.id,
        };

        products[productIndex] = updatedProduct;

        await fsPromises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );

        return updatedProduct;
      } else {
        return `El producto a actualizar con el id ${id} no existe en la lista`;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      await fsPromises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return "Producto eliminado con éxito";
    } else {
      return `El producto a eliminar con el id ${id} no existe en la lista`;
    }
  };
}
