import fs from "fs/promises";

export default class CartManager {
  constructor() {
    this.path = "./src/data/Carts.json";
  }

  getCarts() {
    return fs
      .readFile(this.path, "utf-8")
      .then((data) => JSON.parse(data))
      .catch(() => []);
  }

  addCart() {
    return this.getCarts().then((carts) => {
      const lastCart = carts[carts.length - 1];
      let newId = lastCart ? lastCart.id + 1 : 1;

      const newCart = {
        id: newId,
        products: [],
      };

      carts.push(newCart);

      return fs
        .writeFile(this.path, JSON.stringify(carts, null, "\t"))
        .then(() => newCart);
    });
  }

  getCartById(id) {
    return this.getCarts().then(
      (carts) => carts.find((cart) => cart.id == id) || null
    );
  }

  addProductToCart(cartId, productId, quantity) {
    return this.getCarts().then((carts) => {
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

        return fs
          .writeFile(this.path, JSON.stringify(carts, null, "\t"))
          .then(() => cart);
      } else {
        return Promise.reject({
          error: `Carrito con ID ${cartId} no encontrado`,
        });
      }
    });
  }

  updateCart(cartId, updatedFields) {
    return this.getCarts().then((carts) => {
      const cartIndex = carts.findIndex((cart) => cart.id == cartId);

      if (cartIndex !== -1) {
        const originalCart = carts[cartIndex];
        const updatedCart = {
          ...originalCart,
          ...updatedFields,
          id: originalCart.id,
        };

        carts[cartIndex] = updatedCart;

        return fs
          .writeFile(this.path, JSON.stringify(carts, null, "\t"))
          .then(() => updatedCart);
      } else {
        return Promise.reject(
          `El carrito a actualizar con el id ${cartId} no existe en la lista`
        );
      }
    });
  }

  deleteCart(cartId) {
    return this.getCarts().then((carts) => {
      const cartIndex = carts.findIndex((cart) => cart.id == cartId);

      if (cartIndex !== -1) {
        carts.splice(cartIndex, 1);
        return fs
          .writeFile(this.path, JSON.stringify(carts, null, "\t"))
          .then(() => "Carrito eliminado con éxito");
      } else {
        return Promise.reject(
          `El carrito a eliminar con el id ${cartId} no existe en la lista`
        );
      }
    });
  }
}
