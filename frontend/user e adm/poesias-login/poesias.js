// Dropdown do usuário
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

// Botão flutuante abrir/fechar menu
const toggleSoundMenu = document.getElementById("toggleSoundMenu");
const soundMenu = document.getElementById("soundMenu");

toggleSoundMenu.addEventListener("click", () => {
  soundMenu.classList.toggle("show");
});

// Sons sincronizados, mas que tocam separadamente
const soundIcons = document.querySelectorAll(".floating-sound-menu img");
const playingSounds = new Map();

soundIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    const src = icon.getAttribute("data-som");

    // Para som se já tocando e remove ativo
    if (playingSounds.has(icon)) {
      const audio = playingSounds.get(icon);
      audio.pause();
      audio.currentTime = 0;
      playingSounds.delete(icon);
      icon.classList.remove("active");
    } else {
      // Cria áudio novo e toca
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
      playingSounds.set(icon, audio);
      icon.classList.add("active");
    }
  });
});
