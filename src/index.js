import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

const env = async () => {
  let firstGet = await manager.getProducts();
  console.log(firstGet);

  const product1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc1231",
    stock: 25,
  };
  const product2 = {
    title: "producto prueba2",
    description: "Este es un producto prueba2",
    price: 200,
    thumbnail: "Sin imagen2",
    code: "abc1232",
    stock: 25,
  };
  const product3 = {
    title: "producto prueba3",
    description: "Este es un producto prueba3",
    price: 200,
    thumbnail: "Sin imagen3",
    code: "abc1233",
    stock: 25,
  };
  const product4 = {
    title: "producto prueba4",
    description: "Este es un producto prueba4",
    price: 200,
    thumbnail: "Sin imagen4",
    code: "abc1234",
    stock: 25,
  };
  const product5 = {
    title: "producto prueba4",
    description: "Este es un producto prueba4",
    price: 200,
    thumbnail: "Sin imagen4",
    code: "abc123asd4",
    stock: 25,
  };
  const product6 = {
    title: "producto prueba4",
    description: "Este es un producto prueba4",
    price: 200,
    thumbnail: "Sin imagen4",
    code: "abc123fas4",
    stock: 25,
  };
  const product7 = {
    title: "producto prueba4",
    description: "Este es un producto prueba4",
    price: 200,
    thumbnail: "Sin imagen4",
    code: "abc123df4",
    stock: 25,
  };
  const product8 = {
    title: "producto prueba4",
    description: "Este es un producto prueba4",
    price: 200,
    thumbnail: "Sin imagen4",
    code: "abc123ht4",
    stock: 25,
  };
  const product9 = {
    title: "producto prueba4",
    description: "Este es un producto prueba4",
    price: 200,
    thumbnail: "Sin imagen4",
    code: "abc123G4",
    stock: 25,
  };
  const product10 = {
    title: "producto prueba4",
    description: "Este es un producto prueba4",
    price: 200,
    thumbnail: "Sin imagen4",
    code: "abc123QW4",
    stock: 25,
  };

  //TESTING

  let addProduct = await manager.addProduct(product1);
  let addProduct1 = await manager.addProduct(product2);
  let addProduct2 = await manager.addProduct(product3);
  let addProduct4 = await manager.addProduct(product4);

  //console.log(addProduct2);
  let addProduct3 = await manager.addProduct(product3);

  let getProducts = await manager.getProducts();
  //console.log(getProducts);

  let getProductById = await manager.getProductsById(2);
  console.log(getProductById);

  let updatedProduct = await manager.updateProduct(
    2,
    "nutella",
    "500gr",
    1200,
    "No image",
    153,
    12
  );
  let getProductById1 = await manager.getProductsById(2);
  console.log(getProductById1);
  let deleteProduct1 = await manager.deleteProduct(3);
  let deleteProduct = await manager.deleteProduct(5);
  console.log(deleteProduct1);

  let addProduct5 = await manager.addProduct(product5);
  let addProduct6 = await manager.addProduct(product6);
  let addProduct7 = await manager.addProduct(product7);
  let addProduct8 = await manager.addProduct(product8);
  let addProduct9 = await manager.addProduct(product9);
  let addProduct10 = await manager.addProduct(product10);
  let addProduct22 = await manager.addProduct(product3);
};

env();
