// Menu suspenso do usuário
document.getElementById('userMenu').addEventListener('click', () => {
  document.getElementById('dropdownMenu').classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!document.getElementById('userMenu').contains(e.target)) {
    document.getElementById('dropdownMenu').classList.remove('show');
  }
});

// Sons ao clicar (vários sons simultâneos)
const soundIcons = document.querySelectorAll('.sound-icon');

// Mapa para armazenar o áudio por ícone
const audioMap = new Map();

soundIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const audioSrc = icon.getAttribute('data-som');
    
    // Se já existe um áudio para esse ícone, para e remove
    if (audioMap.has(icon)) {
      const existingAudio = audioMap.get(icon);
      existingAudio.pause();
      existingAudio.currentTime = 0;
      audioMap.delete(icon);

      icon.classList.remove('active'); // <- Remove o efeito visual

      // Verifica se ainda tem algum áudio tocando para pausar respiração
      if (audioMap.size === 0) {
        stopBreathing();
        breathingStarted = false;
        textElement.textContent = "Inspire...";
        circle.textContent = "1";
        circle.style.transform = "scale(1)";
      }

      return;
    }

    // Cria novo áudio e toca
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();

    audioMap.set(icon, audio);
    icon.classList.add('active'); // <- Aplica o efeito visual

    if (!breathingStarted) {
      startBreathing();
      breathingStarted = true;
    }
  });
});

// Variáveis para controle da respiração
const textElement = document.getElementById("breathingText");
const circle = document.getElementById("breathingCircle");

let inspire = true;
let count = 1;
let countDirection = 1;
const maxCount = 5;

let breathingStarted = false;
let counterInterval = null;
let breathingInterval = null;

function updateBreathing() {
  textElement.style.opacity = 0;
  setTimeout(() => {
    textElement.textContent = inspire ? "Inspire..." : "Expire...";
    textElement.style.opacity = 1;
    circle.style.transform = inspire ? "scale(1.3)" : "scale(1)";
    inspire = !inspire;
    countDirection = inspire ? 1 : -1;
    count = inspire ? 1 : maxCount;
  }, 300);
}

function updateCounter() {
  circle.textContent = count;
  count += countDirection;
  if (count > maxCount) count = maxCount;
  if (count < 1) count = 1;
}

function startBreathing() {
  updateBreathing();
  updateCounter();
  counterInterval = setInterval(updateCounter, 800);
  breathingInterval = setInterval(updateBreathing, 4000);
}

function stopBreathing() {
  clearInterval(counterInterval);
  clearInterval(breathingInterval);
}
