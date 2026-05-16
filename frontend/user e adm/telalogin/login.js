document.getElementById("login-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      if (data.usuario.tipo_usuario === 'admin') {
        window.location.href = "../adm/adm.html";
      } else {
        window.location.href = "../sons-login/som.html";
      }
    } else {
      alert(data.erro || "Erro no login");
    }
  } catch (error) {
    alert("Erro ao conectar: verifique se o servidor está rodando em http://localhost:3000");
  }
});