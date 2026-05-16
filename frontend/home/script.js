document.addEventListener("DOMContentLoaded", () => {
    // Event listeners para botões do main
    const subscribeButton = document.querySelector(".subscribe-button");
    const ctaButton = document.querySelector(".cta-button");

    if (subscribeButton) {
        subscribeButton.addEventListener("click", () => {
            window.location.href = "../teste-gratuito/teste.html";
        });
    }

    if (ctaButton) {
        ctaButton.addEventListener("click", () => {
            window.location.href = "../teste-gratuito/teste.html";
        });
    }

    // Funcionalidade do botão do menu
    const menuButton = document.querySelector(".menu-button");
    const menuItems = document.querySelector(".menu-items");

    if (menuButton && menuItems) {
        menuButton.addEventListener('click', () => {
            menuItems.style.display = menuItems.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});


// A lógica do carrossel (`carrimg/js.js`) deve vir em um arquivo separado ou ser copiada aqui.
// Por simplicidade e boa prática, é melhor mantê-la em `carrimg/js.js`
// e garantir que `script.js` seja carregado depois dela no HTML,
// ou que o script do carrossel seja executado após seus elementos HTML estarem disponíveis.
