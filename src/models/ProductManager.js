import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./src/data/Products.json";
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      return result;
    } else {
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

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );

    return newProduct;
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

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );

        return updatedProduct;
      } else {
        return `El producto a actualizar con el id ${id} no existe en la lista`;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return "Producto eliminado con éxito";
    } else {
      return `El producto a eliminar con el id ${id} no existe en la lista`;
    }
  };
}
