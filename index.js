import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

const env = async () => {
  let firstGet = await manager.getProducts();
  console.log(firstGet);

  const product1 = {
    title: "producto prueba",
    description:"Este es un producto prueba",
    price: 200,
    thumbnail:"Sin imagen",
    code:"abc1231",
    stock: 25,

  };
  const product2 = {
    title: "producto prueba2",
    description:"Este es un producto prueba2",
    price: 200,
    thumbnail:"Sin imagen2",
    code:"abc1232",
    stock: 25,
  };
  const product3 = {
    title: "producto prueba3",
    description:"Este es un producto prueba3",
    price: 200,
    thumbnail:"Sin imagen3",
    code:"abc1233",
    stock: 25,
  };
  const product4 = {
    title: "producto prueba4",
    description:"Este es un producto prueba4",
    price: 200,
    thumbnail:"Sin imagen4",
    code:"abc1234",
    stock: 25,
  };


  //TESTING

  let addProduct = await manager.addProduct(product1);
  let addProduct1 = await manager.addProduct(product2);
  let addProduct2 = await manager.addProduct(product3);
  //console.log(addProduct2);
  //let addProduct3 = await manager.addProduct(product4);

  let getProducts = await manager.getProducts();
  //console.log(getProducts);

  let getProductById = await manager.getProductsById(2);
  console.log(getProductById);

  let updatedProduct = await manager.updateProduct(2, "nutella", "500gr", 1200, "No image", 153, 12);
  //console.log(updatedProduct)

  let deleteProduct = await manager.deleteProduct(5);
  console.log(deleteProduct);

};

env();