import fs from "fs";

export default class CartManager {
  constructor() {
    this.path = "./src/data/Carts.json";
  }

  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const result = JSON.parse(data);
      return result;
    } else {
      return [];
    }
  };

  addCart = async () => {
    const carts = await this.getCarts();
    const lastCart = carts[carts.length - 1];

    let newId;
    if (lastCart) {
      newId = lastCart.id + 1;
    } else {
      newId = 1;
    }

    const newCart = {
      id: newId,
      products: [],
    };

    carts.push(newCart);

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

    return newCart;
  };

  getCartById = async (id) => {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id == id);
    return cart ? cart : null;
  };

  addProductToCart = async (cartId, productId, quantity) => {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((cart) => cart.id == cartId);

    if (cartIndex !== -1) {
      const cart = carts[cartIndex];
      const productIndex = cart.products.findIndex(
        (product) => product.id == productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

      return cart;
    } else {
      return { error: `Carrito con ID ${cartId} no encontrado` };
    }
  };
  updateCart = async (cartId, updatedFields) => {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((cart) => cart.id == cartId);

    if (cartIndex !== -1) {
      const originalCart = carts[cartIndex];
      const updatedCart = {
        ...originalCart,
        ...updatedFields,
        id: originalCart.id,
      };

      carts[cartIndex] = updatedCart;

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

      return updatedCart;
    } else {
      return `El carrito a actualizar con el id ${cartId} no existe en la lista`;
    }
  };

  deleteCart = async (cartId) => {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((cart) => cart.id == cartId);

    if (cartIndex !== -1) {
      carts.splice(cartIndex, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return "Carrito eliminado con éxito";
    } else {
      return `El carrito a eliminar con el id ${cartId} no existe en la lista`;
    }
  };
}
