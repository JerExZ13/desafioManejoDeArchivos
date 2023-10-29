import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./src/files/Products.json";
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
  addProduct = async (product) => {
    const products = await this.getProducts();
    if (!Array.isArray(products)) {
      console.error("El archivo no contiene una lista de productos válida");
      return;
    }
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error("Todos los campos son obligatorios");
      return;
    }
    const productCode = products.findIndex(
      (prod) => prod.code === product.code
    );
    if (productCode !== -1) {
      console.log(`Ya existe un producto con el code: ${product.code}`);
      return;
    }
    if (products.length === 0) {
      product.id = 1;
    } else {
      product.id = products[products.length - 1].id + 1;
    }
    products.push(product);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
    return product;
  };
  getProductsById = async (id) => {
    let products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    return product ? product : null;
  };

  updateProduct = async (id, title, descript, price, thumbnail, stock) => {
    try {
      const products = await this.getProducts();
      if (products.length === 0) {
        return "El archivo está vacío";
      }
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        const productoAModificado = products.find(
          (product) => product.id === id
        );
        const productoModificado = {
          id: id,
          title: title || productoAModificado[0].title,
          descript: descript || productoAModificado[0].descript,
          price: price || productoAModificado[0].price,
          thumbnail: thumbnail || productoAModificado[0].thumbnail,
          stock: stock || productoAModificado[0].stock,
        };
        products[productIndex] = productoModificado;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return "Producto actualizado";
      } else {
        return `El producto a actualizar con el id ${id} no existe en la lista`;
      }
    } catch (error) {
      console.log(error);
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
