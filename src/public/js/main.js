document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const addProductForm = document.getElementById("addProductForm");

  addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const codeInput = document.getElementById("code");
    const priceInput = document.getElementById("price");
    const stockInput = document.getElementById("stock");
    const categoryInput = document.getElementById("category");

    const newProduct = {
      title: titleInput.value,
      description: descriptionInput.value,
      code: codeInput.value,
      price: parseFloat(priceInput.value),
      stock: parseInt(stockInput.value),
      category: categoryInput.value,
    };

    socket.emit("nuevoProducto", newProduct);

    addProductForm.reset();
  });

  socket.on("actualizarProductos", (productos) => {
    console.log("Lista de productos actualizada:", productos);
  });
});
