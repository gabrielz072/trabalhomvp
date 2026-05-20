// =========================
// FAVORITOS (favoritos.js)
// =========================

const usuario = Auth.getUsuario();

const token =
  localStorage.getItem("token");

// =========================
// MENU DO USUÁRIO
// =========================

const userMenu =
  document.getElementById("userMenu");

const dropdownMenu =
  document.getElementById("dropdownMenu");

userMenu.addEventListener("click", () => {

  dropdownMenu.classList.toggle("show");

});

document.addEventListener("click", (e) => {

  if (!userMenu.contains(e.target)) {

    dropdownMenu.classList.remove("show");

  }

});

// =========================
// ELEMENTOS
// =========================

const favoritesGrid =
  document.getElementById("favoritesGrid");

const emptyState =
  document.getElementById("emptyState");

// =========================
// PEGAR FAVORITOS DA API
// =========================

async function getFavoritos() {

  try {

    const response =
      await fetch("/api/favoritos", {

        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

    const data =
      await response.json();

    return data.favoritos || [];

  } catch (error) {

    console.error(
      "Erro ao buscar favoritos:",
      error
    );

    return [];

  }

}

// =========================
// RENDERIZAR
// =========================

async function renderFavoritos() {

  const favoritos =
    await getFavoritos();

  favoritesGrid.innerHTML = "";

  if (favoritos.length === 0) {

    emptyState.style.display = "block";

    return;

  }

  emptyState.style.display = "none";

  favoritos.forEach((local) => {

    const card =
      document.createElement("article");

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

          <button 
            class="remove-btn"
            data-id="${local.id}"
          >
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

    button.addEventListener("click", async () => {

      const id =
        button.getAttribute("data-id");

      try {

        await fetch(
          `/api/favoritos/${id}`,
          {

            method: "DELETE",

            headers: {
              Authorization: `Bearer ${token}`
            }

          }
        );

        renderFavoritos();

      } catch (error) {

        console.error(
          "Erro ao remover favorito:",
          error
        );

      }

    });

  });

}

// =========================
// INIT
// =========================

renderFavoritos();

// =========================
// LOGOUT
// =========================

const logoutBtn =
  document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (e) => {

  e.preventDefault();

  // Remove dados do usuário
  localStorage.removeItem("token");

  localStorage.removeItem("usuario");

  // Redireciona para login
  window.location.href =
    "/user_adm/telalogin/login.html";

});