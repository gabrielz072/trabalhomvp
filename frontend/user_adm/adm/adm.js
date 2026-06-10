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

// ================================
// MONITORAMENTO DE VISUALIZAÇÕES
// ================================

async function fetchVisualizacoes() {

  try {

    const res = await fetch('/api/visualizacoes', {
      headers: {
        'Authorization': 'Bearer ' + (Auth.getToken() || '')
      }
    });

    if (!res.ok) {
      throw new Error('Erro ao buscar visualizações');
    }

    return await res.json();

  } catch (err) {

    console.error(err);
    return null;

  }

}

function formatarData(dataISO) {

  if (!dataISO) return '-';

  const data = new Date(dataISO.replace(' ', 'T'));

  return data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

}

function renderVisualizacoes(dados) {

  if (!dados) return;

  const { resumo, por_pagina, recentes } = dados;

  document.getElementById('totalViews').innerText =
    resumo.total || 0;

  document.getElementById('uniquePages').innerText =
    resumo.paginas_unicas || 0;

  document.getElementById('uniqueUsers').innerText =
    resumo.usuarios_unicos || 0;

  const viewsByPage = document.getElementById('viewsByPage');
  viewsByPage.innerHTML = '';

  if (!por_pagina.length) {

    viewsByPage.innerHTML =
      '<p class="empty-message">Nenhuma visualização registrada.</p>';

  } else {

    por_pagina.forEach(item => {

      const div = document.createElement('div');
      div.classList.add('click-item');

      div.innerHTML = `
        <strong>${item.pagina}</strong>
        <span>${item.total} visualizações</span>
      `;

      viewsByPage.appendChild(div);

    });

  }

  const tbody =
    document.querySelector('#recentViewsTable tbody');

  tbody.innerHTML = '';

  if (!recentes.length) {

    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td colspan="3">Nenhuma visualização recente.</td>';
    tbody.appendChild(tr);

  } else {

    recentes.forEach(item => {

      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${item.pagina}</td>
        <td>${item.usuario_nome || 'Visitante'}</td>
        <td>${formatarData(item.criado_em)}</td>
      `;

      tbody.appendChild(tr);

    });

  }

}

async function initVisualizacoes() {

  if (!document.getElementById('totalViews')) return;

  const dados = await fetchVisualizacoes();
  renderVisualizacoes(dados);

  const clearBtn = document.getElementById('clearViews');

  if (clearBtn) {

    clearBtn.addEventListener('click', async () => {

      if (!confirm('Limpar todas as visualizações registradas?')) return;

      try {

        const res = await fetch('/api/visualizacoes', {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + (Auth.getToken() || '')
          }
        });

        if (!res.ok) {
          throw new Error('Erro ao limpar visualizações');
        }

        renderVisualizacoes({
          resumo: { total: 0, paginas_unicas: 0, usuarios_unicos: 0 },
          por_pagina: [],
          recentes: []
        });

      } catch (err) {

        console.error(err);
        alert('Falha ao limpar visualizações');

      }

    });

  }

}

initVisualizacoes();

// ================================
// GERENCIAMENTO DE USUÁRIOS (ADMIN)
// ================================

async function fetchUsuarios() {
  try {
    const res = await fetch('/api/auth/usuarios', {
      headers: {
        'Authorization': 'Bearer ' + (Auth.getToken() || '')
      }
    });

    if (!res.ok) {
      throw new Error('Erro ao buscar usuários');
    }

    const data = await res.json();
    return data.usuarios || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function showUserMessage(text, timeout = 3000) {
  const el = document.getElementById('userMessage');
  if (!el) return;
  el.textContent = text;
  setTimeout(() => { el.textContent = ''; }, timeout);
}

function renderUsuarios(usuarios) {
  const tbody = document.querySelector('#usersTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  usuarios.forEach(u => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${u.nome || ''}</td>
      <td>${u.email || ''}</td>
      <td>${u.tipo_usuario || ''}</td>
      <td>
        <button class="btn-view" data-id="${u.id}">Ver</button>
        <button class="btn-delete" data-id="${u.id}">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Attach handlers
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      if (!id) return;
      if (!confirm('Confirmar exclusão deste usuário?')) return;
      await deletarUsuario(id);
    });
  });

  document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const usuario = usuarios.find(x => String(x.id) === String(id));
      if (usuario) {
        alert(`Nome: ${usuario.nome}\nEmail: ${usuario.email}\nTipo: ${usuario.tipo_usuario}`);
      }
    });
  });

}

async function deletarUsuario(id) {
  try {
    const res = await fetch('/api/auth/usuarios/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + (Auth.getToken() || ''),
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.erro || 'Erro ao deletar usuário');
    }

    showUserMessage('Usuário removido');
    const usuarios = await fetchUsuarios();
    renderUsuarios(usuarios);

  } catch (err) {
    console.error(err);
    showUserMessage('Falha ao deletar usuário');
  }
}

// Inicializa listagem de usuários se a seção existir
async function initUsuarios() {
  if (!document.getElementById('usersTable')) return;
  const usuarios = await fetchUsuarios();
  renderUsuarios(usuarios);
}

initUsuarios();