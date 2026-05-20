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


// ================================
// FAVORITOS POR USUÁRIO (API)
// ================================

const usuario =
  Auth.getUsuario();

const token =
  localStorage.getItem("token");

const favoriteButtons =
  document.querySelectorAll(".favorite-btn");

// Favoritos vindos do banco
let favoritos = [];


// ================================
// FUNÇÃO ANALYTICS
// ================================

function trackClick(name) {

  const data =
    JSON.parse(
      localStorage.getItem("analytics_clicks")
    ) || [];

  const item =
    data.find(i => i.name === name);

  if (item) {

    item.count++;

  } else {

    data.push({
      name,
      count: 1
    });

  }

  localStorage.setItem(
    "analytics_clicks",
    JSON.stringify(data)
  );

}


// ================================
// CARREGAR FAVORITOS DA API
// ================================

async function carregarFavoritos() {

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

    favoritos =
      data.favoritos || [];

    atualizarBotoes();

  } catch (err) {

    console.error(
      "Erro ao carregar favoritos",
      err
    );

  }

}


// ================================
// ATUALIZAR BOTÕES
// ================================

function atualizarBotoes() {

  favoriteButtons.forEach(button => {

    const card =
      button.closest(".trail-card");

    const nome =
      card.querySelector("h2").innerText;

    const existe =
      favoritos.some(
        item => item.nome === nome
      );

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
// FAVORITAR / DESFAVORITAR
// ================================

favoriteButtons.forEach(button => {

  button.addEventListener(
    "click",
    async () => {

      const card =
        button.closest(".trail-card");

      const nome =
        card.querySelector("h2").innerText;

      const imagem =
        card.querySelector("img").src;

      const descricao =
        card.querySelector(
          ".trail-description"
        ).innerText;

      const localizacao =
        card.querySelector(
          ".trail-location"
        ).innerText;

      const favoritoExistente =
        favoritos.find(
          item => item.nome === nome
        );

      // ======================
      // ADICIONAR
      // ======================

      if (!favoritoExistente) {

        try {

          const response =
            await fetch(
              "/api/favoritos",
              {

                method: "POST",

                headers: {

                  "Content-Type":
                    "application/json",

                  Authorization:
                    `Bearer ${token}`

                },

                body: JSON.stringify({
                  nome,
                  imagem,
                  descricao,
                  localizacao
                })

              }
            );

          const data =
            await response.json();

          favoritos.push({

            id:
              data.favoritoId,

            nome,
            imagem,
            descricao,
            localizacao

          });

          button.classList.add("active");

          button.innerHTML = "♥";

          trackClick("favoritou");

        } catch (err) {

          console.error(
            "Erro ao favoritar",
            err
          );

        }

      }

      // ======================
      // REMOVER
      // ======================

      else {

        try {

          await fetch(
            `/api/favoritos/${favoritoExistente.id}`,
            {

              method: "DELETE",

              headers: {
                Authorization:
                  `Bearer ${token}`
              }

            }
          );

          favoritos =
            favoritos.filter(
              item => item.nome !== nome
            );

          button.classList.remove("active");

          button.innerHTML = "♡";

          trackClick("desfavoritou");

        } catch (err) {

          console.error(
            "Erro ao remover favorito",
            err
          );

        }

      }

    }

  );

});


// ================================
// INICIALIZAR
// ================================

carregarFavoritos();


// =========================
// LOGOUT
// =========================

const logoutBtn =
  document.getElementById("logoutBtn");

logoutBtn.addEventListener(
  "click",
  (e) => {

    e.preventDefault();

    localStorage.removeItem("token");

    localStorage.removeItem("usuario");

    window.location.href =
      "/user_adm/telalogin/login.html";

  }
);