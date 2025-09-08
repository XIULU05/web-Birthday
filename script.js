// script.js

// ---- Efecto de escritura ----
const titleText = "¡Hola mi amor!";
const subText = "Hoy celebramos tu día — este lugar es para ti.";
const speed = 90;

function typeEffect(targetId, text, cb) {
  const target = document.getElementById(targetId);
  let i = 0;
  target.textContent = "";
  const timer = setInterval(() => {
    target.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (cb) cb();
    }
  }, speed);
}

window.addEventListener('load', () => {
  // Escribe el título y luego el subtítulo
  typeEffect('typed-title', titleText, () => {
    setTimeout(() => { typeEffect('typed-sub', subText); }, 350);
  });
});

// ---- Menú lateral ----
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('open');
  sideMenu.setAttribute('aria-hidden', 'false');
});
closeMenu.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden', 'true');
});

// ---- Audio simple ----
const audio = document.getElementById('audio');
document.getElementById('playAudio').addEventListener('click', () => {
  audio.play().catch(e => console.log('Autoplay bloqueado, usa el botón.'));
});
document.getElementById('pauseAudio').addEventListener('click', () => audio.pause());

// ---- Sorpresa (mostrar/ocultar) ----
document.getElementById('openSurprise').addEventListener('click', () => {
  const box = document.getElementById('surpriseBox');
  box.classList.toggle('hidden');
});

// ---- Muro de deseos (local) ----
const wishInput = document.getElementById('wishInput');
const addWish = document.getElementById('addWish');
const wishList = document.getElementById('wishList');

addWish.addEventListener('click', () => {
  const text = wishInput.value.trim();
  if (!text) return;
  const div = document.createElement('div');
  div.className = 'wish-item';
  div.textContent = text;
  wishList.prepend(div);
  wishInput.value = '';
});



