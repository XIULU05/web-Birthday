document.addEventListener('DOMContentLoaded', () => {

    // 1. Funcionalidad del Menú de Música
    const musicBtn = document.getElementById('music-btn');
    const playlistMenu = document.getElementById('playlist-menu');
    const music = document.getElementById('background-music');
    const songItems = document.querySelectorAll('.song-item');

    musicBtn.addEventListener('click', () => {
        playlistMenu.classList.toggle('hidden');
    });

    songItems.forEach(item => {
        item.addEventListener('click', () => {
            const songSrc = item.getAttribute('data-src');
            music.src = songSrc;
            music.play();
            playlistMenu.classList.add('hidden'); // Cierra el menú después de seleccionar
        });
    });

    // 2. Funcionalidad de la Galería de Pilotos (Modal)
    const galleryToggleBtn = document.getElementById('gallery-toggle-btn');
    const galleryModal = document.getElementById('gallery-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    galleryToggleBtn.addEventListener('click', () => {
        galleryModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        galleryModal.style.display = 'none';
    });

    // Cierra el modal si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === galleryModal) {
            galleryModal.style.display = 'none';
        }
    });

    // 3. Animación de escritura del Mensaje Personal
    const messageText = document.getElementById('message-text');
    const fullMessage = "Aquí va tu mensaje personal. Recuerda que este mensaje es lo que más va a valorar. Hazlo único y especial.";

    let i = 0;
    function typeWriter() {
        if (i < fullMessage.length) {
            messageText.innerHTML += fullMessage.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Velocidad de escritura
        }
    }

    setTimeout(() => {
        typeWriter();
    }, 2000); // Espera 2 segundos para iniciar la animación
});







