// =========================
// MENU RESPONSIVO
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-button");
    const menuItems = document.querySelector(".menu-items");

    if (menuButton && menuItems) {

        menuButton.addEventListener("click", () => {

            menuItems.style.display =
                menuItems.style.display === "flex"
                    ? "none"
                    : "flex";

        });

    }

    carregarClima();
    carregarLocais();

});


// =========================
// CLIMA TERESÓPOLIS
// =========================

async function carregarClima() {

    const weatherInfo = document.getElementById("weather-info");

    if (!weatherInfo) return;

    try {

        const resposta = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=-22.4167&longitude=-42.9756&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,cloud_cover,wind_speed_10m&timezone=auto"
        );

        const data = await resposta.json();

        const c = data.current;

        let dica = "";

        if (c.precipitation > 2) {
            dica = "🌧️ Evite trilhas hoje";
        } else if (c.cloud_cover < 30) {
            dica = "🌄 Perfeito para trilhas";
        } else {
            dica = "🌿 Bom para passeios leves";
        }

        let emoji = "⛅";

        if (c.precipitation > 2) {
            emoji = "🌧️";
        } else if (c.cloud_cover < 30) {
            emoji = "☀️";
        } else {
            emoji = "☁️";
        }

        weatherInfo.innerHTML = `
            <div class="weather-main">

                <div class="weather-icon">
                    ${emoji}
                </div>

                <div class="weather-temp">
                    ${Math.round(c.temperature_2m)}°C
                </div>

                <div class="weather-status">
                    Atualizado em ${new Date().toLocaleTimeString("pt-BR")}
                </div>

            </div>

            <div class="weather-grid">

                <div class="weather-box">
                    <span>Sensação térmica</span>
                    <strong>${Math.round(c.apparent_temperature)}°C</strong>
                </div>

                <div class="weather-box">
                    <span>Umidade</span>
                    <strong>${c.relative_humidity_2m}%</strong>
                </div>

                <div class="weather-box">
                    <span>Nuvens</span>
                    <strong>${c.cloud_cover}%</strong>
                </div>

                <div class="weather-box">
                    <span>Vento</span>
                    <strong>${Math.round(c.wind_speed_10m)} km/h</strong>
                </div>

            </div>

            <div class="weather-tip">
                ${dica}
            </div>
        `;

    } catch (erro) {

        weatherInfo.innerHTML = `
            <div class="weather-tip">
                ❌ Não foi possível carregar o clima.
            </div>
        `;

        console.error(erro);

    }

}


// =========================
// LOCAIS + WIKIPEDIA
// =========================

async function buscarImagemWikipedia(nome) {

    try {

        const resposta = await fetch(
            `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nome)}`
        );

        const dados = await resposta.json();

        if (!dados.thumbnail?.source) {
            return null;
        }

        return {
            imagem: dados.thumbnail.source,
            descricao:
                dados.extract ||
                "Descrição não disponível."
        };

    } catch {

        return null;

    }

}

async function carregarLocais() {

    const container =
        document.getElementById("cards-locais");

    if (!container) return;

    container.innerHTML =
        "<p>Carregando locais...</p>";

    try {

        const query = `
        [out:json];
        area["name"="Teresópolis"]->.searchArea;

        (
            node["tourism"="attraction"](area.searchArea);
            node["natural"="waterfall"](area.searchArea);
            node["tourism"="viewpoint"](area.searchArea);
        );

        out;
        `;

        const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
                method: "POST",
                body: query
            }
        );

        const data = await response.json();

        container.innerHTML = "";

        const locais = data.elements
            .filter(local => local.tags?.name);

        let exibidos = 0;

        for (const local of locais) {

            if (exibidos >= 12) break;

            const nome = local.tags.name;

            const wiki =
                await buscarImagemWikipedia(nome);

            if (!wiki) {
                continue;
            }

            let tipo = "🏔️ Atração";

            if (local.tags.natural === "waterfall") {
                tipo = "🌊 Cachoeira";
            }

            if (local.tags.tourism === "viewpoint") {
                tipo = "🌄 Mirante";
            }

            const card =
                document.createElement("div");

            card.classList.add("local-card");

            card.innerHTML = `

                <img
                    src="${wiki.imagem}"
                    alt="${nome}"
                    class="local-img"
                >

                <div class="local-card-content">

                    <h3>${nome}</h3>

                    <p><strong>${tipo}</strong></p>

                    <p>
                        ${
                            wiki.descricao.length > 180
                                ? wiki.descricao.substring(0, 180) + "..."
                                : wiki.descricao
                        }
                    </p>

                    <a
                        href="https://www.google.com/maps?q=${local.lat},${local.lon}"
                        target="_blank"
                    >
                        📍 Ver no mapa
                    </a>

                </div>
            `;

            container.appendChild(card);

            exibidos++;

        }

        if (exibidos === 0) {

            container.innerHTML = `
                <p>
                    Nenhum local com imagem disponível foi encontrado.
                </p>
            `;

        }

    } catch (erro) {

        container.innerHTML =
            "<p>Não foi possível carregar os locais.</p>";

        console.error(erro);

    }

}