// =========================
// FAVORITOS (favoritos.js)
// =========================

const usuario = Auth.getUsuario();

const storageKey =
  `favoritos_${usuario.email}`;

// ELEMENTOS
const favoritesGrid =
  document.getElementById("favoritesGrid");

const emptyState =
  document.getElementById("emptyState");

// =========================
// PEGAR FAVORITOS
// =========================

function getFavoritos() {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}

// =========================
// RENDERIZAR
// =========================

function renderFavoritos() {

  const favoritos = getFavoritos();

  favoritesGrid.innerHTML = "";

  if (favoritos.length === 0) {

    emptyState.style.display = "block";
    return;

  }

  emptyState.style.display = "none";

  favoritos.forEach((local, index) => {

    const card = document.createElement("article");

    card.classList.add("favorite-card");

    card.innerHTML = `

      <img src="${local.imagem}" alt="${local.nome}">

      <div class="favorite-content">

        <h2>${local.nome}</h2>

        <p class="favorite-location">
          📍 ${local.localizacao}
        </p>

        <p class="favorite-description">
          ${local.descricao}
        </p>

        <div class="favorite-actions">

          <button class="remove-btn" data-index="${index}">
            Remover
          </button>

        </div>

      </div>

    `;

    favoritesGrid.appendChild(card);

  });

  ativarRemocao();

}

// =========================
// REMOVER FAVORITO
// =========================

function ativarRemocao() {

  const buttons =
    document.querySelectorAll(".remove-btn");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const index =
        parseInt(button.getAttribute("data-index"));

      let favoritos =
        getFavoritos();

      favoritos.splice(index, 1);

      localStorage.setItem(
        storageKey,
        JSON.stringify(favoritos)
      );

      renderFavoritos();

    });

  });

}

// =========================
// INIT
// =========================

renderFavoritos();