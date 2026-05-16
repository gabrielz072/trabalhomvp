document.addEventListener("DOMContentLoaded", () => {
  const subscribeButton = document.querySelector(".subscribe-button");
  const menuButton = document.querySelector(".menu-button");
  const menuItems = document.querySelector(".menu-items");

  if (subscribeButton) {
    subscribeButton.addEventListener("click", () => {
      window.location.href = "../assinatura/assine.html";
    });
  }

  if (menuButton && menuItems) {
    menuButton.addEventListener("click", () => {
      const isVisible = getComputedStyle(menuItems).display === "flex";
      menuItems.style.display = isVisible ? "none" : "flex";
    });
  }
});
