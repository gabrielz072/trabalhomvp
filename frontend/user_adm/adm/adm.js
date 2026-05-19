// ================================
// SISTEMA DE ANALYTICS SIMPLES
// ================================

const STORAGE_KEY = "analytics_clicks";

// ================================
// PEGAR DADOS
// ================================

function getClicks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// ================================
// SALVAR CLIQUE (USADO NA HOME)
// ================================

function trackClick(eventName) {

  const clicks = getClicks();

  const existing =
    clicks.find(c => c.name === eventName);

  if (existing) {
    existing.count += 1;
  } else {
    clicks.push({
      name: eventName,
      count: 1
    });
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(clicks)
  );

}

// ================================
// RENDERIZAR DASHBOARD
// ================================

function renderAnalytics() {

  const clicks = getClicks();

  const total = clicks.reduce((acc, item) => acc + item.count, 0);

  document.getElementById("totalClicks").innerText = total;

  const list = document.getElementById("clickList");

  list.innerHTML = "";

  clicks
    .sort((a, b) => b.count - a.count)
    .forEach(item => {

      const div = document.createElement("div");

      div.classList.add("click-item");

      div.innerHTML = `
        <strong>${item.name}</strong>
        <span>${item.count} cliques</span>
      `;

      list.appendChild(div);

    });

}

// ================================
// LIMPAR ANALYTICS
// ================================

document.getElementById("clearAnalytics")
  .addEventListener("click", () => {

    localStorage.removeItem(STORAGE_KEY);
    renderAnalytics();

  });

// ================================
// INIT
// ================================

renderAnalytics();