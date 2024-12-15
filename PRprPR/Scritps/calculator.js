const display = document.querySelector("#calc-display");
const buttons = document.querySelectorAll(".calculator__button");
const clearButton = document.querySelector(".calculator__button--clear");
const equalsButton = document.querySelector(".calculator__button--equals");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (value === "C") {
      display.value = "";
    } else if (value === "=") {
      display.value = eval(display.value);
    } else {
      display.value += value;
    }
  });
});