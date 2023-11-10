import ProductManager from "./models/ProductManager.js";

const manager = new ProductManager();

const testOperations = async () => {
  try {
    const initialProducts = await manager.getProducts();
    console.log("Productos iniciales:", initialProducts);

    const product1 = {
      title: "Cheese",
      description: "500 gr",
      code: "AGSM123",
      price: 23,
      status: true,
      stock: 4,
      category: "food",
      thumbnails: [
        "http://localhost:8080/images/image1.jpg",
        "http://localhost:8080/images/image2.jpg",
      ],
    };

    const product2 = {
      title: "Milk",
      description: "1 liter",
      code: "MILK001",
      price: 2.5,
      status: true,
      stock: 10,
      category: "food",
      thumbnails: [
        "http://localhost:8080/images/milk1.jpg",
        "http://localhost:8080/images/milk2.jpg",
      ],
    };

    const addedProduct1 = await manager.addProduct(product1);
    const addedProduct2 = await manager.addProduct(product2);
    console.log("Productos agregados:", addedProduct1, addedProduct2);

    const productById = await manager.getProductById(1);
    console.log("Producto por ID:", productById);

    const updatedData = {
      id: 1,
      title: "Nuevo nombre",
      description: "Nueva descripción",
      price: 99.99,
      stock: 50,
    };

    const updatedProduct = await manager.updateProduct(updatedData);

    if (updatedProduct) {
      console.log("Producto actualizado:", updatedProduct);
    } else {
      console.log("El producto no existe o no se pudo actualizar.");
    }

    const deleteResult = await manager.deleteProduct(2);
    console.log("Resultado de eliminación:", deleteResult);

    const finalProducts = await manager.getProducts();
    console.log("Productos finales:", finalProducts);
  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
};

testOperations();
