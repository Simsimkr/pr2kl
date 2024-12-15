const openMenu = () => {
    console.log("Menu otwarte!");
    menuContainer.style.display = "block";
  };
  
  const closeMenu = () => {
    console.log("Menu zamknięte!");
    menuContainer.style.display = "none";
  };
  
  menu.addEventListener("click", () => {
    openMenu();
  });
  
  menuClose.addEventListener("click", () => {
    closeMenu();
  });
  