// ================================
// FAVORITOS POR USUÁRIO (onde_ir.js)
// ================================

const usuario = Auth.getUsuario();

const storageKey =
  `favoritos_${usuario.email}`;

const favoriteButtons =
  document.querySelectorAll(".favorite-btn");

// Carrega favoritos
let favoritos =
  JSON.parse(localStorage.getItem(storageKey)) || [];


// ================================
// FUNÇÃO ANALYTICS
// ================================

function trackClick(name) {

  const data =
    JSON.parse(localStorage.getItem("analytics_clicks")) || [];

  const item =
    data.find(i => i.name === name);

  if (item) {
    item.count++;
  } else {
    data.push({ name, count: 1 });
  }

  localStorage.setItem(
    "analytics_clicks",
    JSON.stringify(data)
  );

}


// ================================
// ATUALIZAR BOTÕES NA ENTRADA
// ================================

function atualizarBotoes() {

  favoriteButtons.forEach(button => {

    const card =
      button.closest(".trail-card");

    const nome =
      card.querySelector("h2").innerText;

    const existe =
      favoritos.some(item => item.nome === nome);

    if (existe) {
      button.classList.add("active");
      button.innerHTML = "♥";
    } else {
      button.classList.remove("active");
      button.innerHTML = "♡";
    }

  });

}


// ================================
// CLIQUE FAVORITAR / DESFAVORITAR
// ================================

favoriteButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card =
      button.closest(".trail-card");

    const nome =
      card.querySelector("h2").innerText;

    const imagem =
      card.querySelector("img").src;

    const descricao =
      card.querySelector(".trail-description").innerText;

    const localizacao =
      card.querySelector(".trail-location").innerText;

    favoritos =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    const index =
      favoritos.findIndex(item => item.nome === nome);

    // ======================
    // ADICIONAR
    // ======================
    if (index === -1) {

      favoritos.push({
        nome,
        imagem,
        descricao,
        localizacao
      });

      button.classList.add("active");
      button.innerHTML = "♥";

      trackClick("favoritou");

    }

    // ======================
    // REMOVER
    // ======================
    else {

      favoritos.splice(index, 1);

      button.classList.remove("active");
      button.innerHTML = "♡";

      trackClick("desfavoritou");

    }

    localStorage.setItem(
      storageKey,
      JSON.stringify(favoritos)
    );

  });

});


// ================================
// INICIALIZAR ESTADO
// ================================

atualizarBotoes();