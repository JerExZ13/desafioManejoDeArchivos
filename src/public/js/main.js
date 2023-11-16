document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  socket.on("actualizarProductos", (products) => {
    updateProductList(products);
  });

  function updateProductList(products) {
    const productList = document.querySelector("#productList");
    productList.innerHTML = "";

    products.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${product.title} - ${product.description} - ${product.price}`;
      productList.appendChild(listItem);
    });
  }
});
