function addToCart(productName) {
  console.log(`${productName} został dodany do koszyka.`);
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.getAttribute("data-product");
    addToCart(productName);
  });
});






