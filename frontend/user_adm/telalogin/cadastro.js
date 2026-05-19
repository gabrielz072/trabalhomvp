document.getElementById("registro-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (senha !== confirmarSenha) {
    alert("Senhas não correspondem");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, confirmarSenha })
    });

    const data = await res.json();

    if (data.mensagem) {
      alert("Cadastro feito! Agora faça login");
      window.location.href = "login.html";
    } else {
      alert(data.erro || "Erro no cadastro");
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor");
  }
});
