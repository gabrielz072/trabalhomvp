console.log("JS funcionando");
// MENU RESPONSIVO

const menuButton = document.querySelector('.menu-button');

const menuItems = document.querySelector('.menu-items');

menuButton.addEventListener('click', () => {

  menuItems.classList.toggle('show');

});


// FORMULÁRIO

document.getElementById('form-local').addEventListener('submit', async function (e) {

  e.preventDefault();

  const nome = document.getElementById('nome').value;

  const categoria = document.getElementById('categoria').value;

  const descricao = document.getElementById('descricao').value;

  const localizacao = document.getElementById('localizacao').value;

  if (!nome || !categoria || !descricao || !localizacao) {

    alert('Preencha todos os campos.');

    return;

  }

  try {

    const res = await fetch('http://localhost:3000/api/locais', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        nome,
        categoria,
        descricao,
        localizacao
      })

    });

    const data = await res.json();

    if (!res.ok) {

      alert(data.erro || 'Erro ao cadastrar local.');

      return;

    }

    alert('Local enviado com sucesso!');

    document.getElementById('form-local').reset();

  } catch (error) {

    alert('Erro de conexão com o servidor.');

  }

});

// =========================
// CLIMA TERESÓPOLIS
// =========================

async function carregarClima() {

  const weatherInfo = document.getElementById("weather-info");

  // Segurança: verifica se a div existe
  if (!weatherInfo) return;

  try {

    const resposta = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-22.4167&longitude=-42.9756&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,cloud_cover,wind_speed_10m&timezone=auto"
    );

    // Segurança: verifica se API respondeu
    if (!resposta.ok) {
      throw new Error("Erro na API");
    }

    const data = await resposta.json();

    // Segurança: verifica se current existe
    if (!data.current) {
      throw new Error("Dados inválidos");
    }

    const c = data.current;

    let dica = "";

    if (c.precipitation > 2) {
      dica = "🌧️ Evite trilhas hoje";
    } else if (c.cloud_cover < 30) {
      dica = "🌄 Perfeito para trilhas";
    } else {
      dica = "🌿 Bom para passeios leves";
    }

    weatherInfo.innerHTML = `
      <div class="weather-temp">${c.temperature_2m}°C</div>

      <div class="weather-details">
        🤗 Sensação: ${c.apparent_temperature}°C <br>
        💧 Umidade: ${c.relative_humidity_2m}% <br>
        ☁️ Nuvens: ${c.cloud_cover}% <br>
        💨 Vento: ${c.wind_speed_10m} km/h
      </div>

      <div class="weather-tip">
        ${dica}
      </div>
    `;

  } catch (erro) {

    weatherInfo.innerHTML = `
      <div class="weather-tip">
        Não foi possível carregar o clima no momento.
      </div>
    `;

    console.error("Erro ao carregar clima:", erro);
  }
}

// Executa função
carregarClima();