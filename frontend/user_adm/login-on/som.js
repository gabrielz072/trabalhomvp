// =========================
// MENU DO USUÁRIO
// =========================

const userMenu = document.getElementById('userMenu');
const dropdownMenu = document.getElementById('dropdownMenu');

userMenu.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!userMenu.contains(e.target)) {
    dropdownMenu.classList.remove('show');
  }
});


// =========================
// FRASES RELAXANTES
// =========================

const frases = [
  "Respire profundamente 🌿",
  "Seu momento de calma começa agora 🍃",
  "Desacelere sua mente ✨",
  "Ouça a natureza ao seu redor 🌧️",
  "Tudo pode esperar alguns minutos ☁️",
  "Relaxe no seu próprio ritmo 🌊"
];

const subtitle = document.querySelector('.welcome-box p');

let fraseAtual = 0;

setInterval(() => {

  subtitle.style.opacity = 0;

  setTimeout(() => {

    fraseAtual++;

    if (fraseAtual >= frases.length) {
      fraseAtual = 0;
    }

    subtitle.textContent = frases[fraseAtual];

    subtitle.style.opacity = 1;

  }, 400);

}, 5000);


// =========================
// CONTROLE DOS SONS
// =========================

const soundIcons = document.querySelectorAll('.sound-icon');

// Armazena os áudios ativos
const audioMap = new Map();

soundIcons.forEach(icon => {

  icon.addEventListener('click', () => {

    const audioSrc = icon.getAttribute('data-som');

    // Se o som já estiver tocando
    if (audioMap.has(icon)) {

      const existingAudio = audioMap.get(icon);

      existingAudio.pause();
      existingAudio.currentTime = 0;

      audioMap.delete(icon);

      icon.classList.remove('active');

      // Se nenhum som estiver ativo
      if (audioMap.size === 0) {

        stopBreathing();

        breathingStarted = false;

        textElement.textContent = "Inspire...";

        circle.textContent = "1";

        circle.style.transform = "scale(1)";
      }

      return;
    }

    // Cria novo áudio
    const audio = new Audio(audioSrc);

    audio.loop = true;

    audio.volume = 0.5;

    audio.play();

    audioMap.set(icon, audio);

    icon.classList.add('active');

    // Inicia respiração
    if (!breathingStarted) {

      startBreathing();

      breathingStarted = true;
    }

  });

});


// =========================
// RESPIRAÇÃO GUIADA
// =========================

const textElement = document.getElementById("breathingText");

const circle = document.getElementById("breathingCircle");

let inspire = true;

let count = 1;

let countDirection = 1;

const maxCount = 5;

let breathingStarted = false;

let counterInterval = null;

let breathingInterval = null;


// Alterna Inspire / Expire

function updateBreathing() {

  textElement.style.opacity = 0;

  setTimeout(() => {

    textElement.textContent = inspire
      ? "Inspire..."
      : "Expire...";

    textElement.style.opacity = 1;

    circle.style.transform = inspire
      ? "scale(1.3)"
      : "scale(1)";

    inspire = !inspire;

    countDirection = inspire ? 1 : -1;

    count = inspire ? 1 : maxCount;

  }, 300);

}


// Atualiza contador

function updateCounter() {

  circle.textContent = count;

  count += countDirection;

  if (count > maxCount) {
    count = maxCount;
  }

  if (count < 1) {
    count = 1;
  }

}


// Inicia respiração

function startBreathing() {

  updateBreathing();

  updateCounter();

  counterInterval = setInterval(updateCounter, 800);

  breathingInterval = setInterval(updateBreathing, 4000);

}


// Para respiração

function stopBreathing() {

  clearInterval(counterInterval);

  clearInterval(breathingInterval);

}

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