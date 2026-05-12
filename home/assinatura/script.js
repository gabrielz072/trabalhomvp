// Menu toggle (caso deseje aprimorar interatividade futuramente)
document.querySelector('.menu-button').addEventListener('click', () => {
  document.querySelector('.menu-items').classList.toggle('show');
});

document.getElementById('form-assinatura').addEventListener('submit', async function (e) {
  e.preventDefault(); // Impede envio automático

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const pagamento = document.getElementById('pagamento').value;
  const plano = document.getElementById('plano').value;

  if (nome.split(' ').length < 2) {
    alert('Por favor, insira seu nome completo (nome e sobrenome).');
    return;
  }

  if (!email || !senha || !pagamento || !plano) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, confirmarSenha: senha, tipo_usuario: 'usuario' })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.erro || 'Erro ao registrar.');
      return;
    }

    alert('Registro realizado com sucesso! Redirecionando para Sons.');
    window.location.href = '../user e adm/sons-login/som.html';
  } catch (error) {
    alert('Erro de conexão. Verifique se o servidor está rodando.');
  }
});

