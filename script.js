// script.js

// --- 1. Lógica de la Cuenta Regresiva ---
function setupCountdown() {
  // Define la fecha de cumpleaños de tu novia (Año, Mes-1, Día, Hora, Minutos, Segundos)
  // Ejemplo: 15 de marzo de 2025 a las 10:00:00
  const birthdayDate = new Date('Noviembre 09, 2025 12:00:00').getTime(); // ¡AJUSTA ESTA FECHA!

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Calculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualiza el HTML
    document.getElementById('countdown-hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').innerText = String(seconds).padStart(2, '0');

    // Cuando la cuenta regresiva termina
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.querySelector('.countdown').innerHTML = "¡FELIZ CUMPLEAÑOS!";
      // Aquí podrías activar otra sorpresa, como un pop-up o una animación
    }
  }, 1000); // Actualiza cada segundo
}

// --- 2. Lógica de la Galería de Corredores (Interactividad) ---
function setupDriversGallery() {
  const driverPortraits = document.querySelectorAll('.driver-portrait');

  driverPortraits.forEach(portrait => {
    portrait.addEventListener('click', () => {
      const driverName = portrait.dataset.driver; // Obtiene el nombre del corredor (ej: 'max')
      
      // Aquí iría la lógica para mostrar el mensaje y la foto del corredor
      // Por ahora, solo mostraremos una alerta, pero esto lo puedes personalizar.
      
      let message = "¡Hola! Este es un mensaje genérico para tu corredor favorito.";
      let driverFullName = "";

      switch (driverName) {
        case 'max':
          driverFullName = "Max Verstappen";
          message = "¡Max te envía un saludo de velocidad! Que tengas un día lleno de emoción y alegría. ¡Sigue tu camino hacia la victoria!";
          break;
        case 'charles':
          driverFullName = "Charles Leclerc";
          message = "¡Charles te desea un cumpleaños lleno de pasión y momentos inolvidables! Que cada vuelta de tu vida esté llena de felicidad.";
          break;
        case 'lewis':
          driverFullName = "Lewis Hamilton";
          message = "¡Lewis te desea un día lleno de inspiración y brillo! Que tu camino esté siempre lleno de fuerza y determinación. ¡Feliz Cumpleaños!";
          break;
        case 'george':
          driverFullName = "George Russell";
          message = "¡George te envía la mejor energía para tu cumpleaños! Que disfrutes de cada momento y sigas persiguiendo tus sueños con la misma pasión de un campeón.";
          break;
        default:
          driverFullName = "Un corredor misterioso";
          message = "¡Un campeón de la F1 te saluda! Que este sea un día lleno de éxitos y felicidad. ¡Feliz Cumpleaños!";
          break;
      }

      alert(`Mensaje de ${driverFullName}:\n\n"${message}"`);

      // Idea: Podrías crear un modal (ventana emergente) en HTML y CSS
      // y llenarlo con la imagen del corredor y el mensaje, en lugar de un alert.
      // Esto sería mucho más bonito visualmente.
    });
  });
}

// --- 3. Ejecutar las funciones cuando el DOM esté completamente cargado ---
document.addEventListener('DOMContentLoaded', () => {
  setupCountdown();
  setupDriversGallery();
});

