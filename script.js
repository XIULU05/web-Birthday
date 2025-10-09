document.addEventListener('DOMContentLoaded', () => {

    // 1. Funcionalidad del Menú de Música (navbar)
    const musicBtn = document.getElementById('music-btn');
    const playlistMenu = document.getElementById('playlist-menu');
    const music = document.getElementById('background-music');
    const songItems = document.querySelectorAll('.song-item');

    if (musicBtn && playlistMenu) {
        musicBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            playlistMenu.classList.toggle('hidden');
            playlistMenu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!playlistMenu.contains(event.target) && event.target !== musicBtn) {
                playlistMenu.classList.add('hidden');
                playlistMenu.classList.remove('active');
            }
        });

        songItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                const songSrc = item.getAttribute('data-src');
                music.src = songSrc;
                music.play();
                playlistMenu.classList.add('hidden');
                playlistMenu.classList.remove('active');
            });
        });
    }

    // 2. Animación de escritura del Mensaje Personal
    const messageText = document.getElementById('message-text');
    // ** IMPORTANTE: ¡Cambia este mensaje por el tuyo personal! **
    const fullMessage = "Aquí va tu mensaje personal. Recuerda que este mensaje es lo que más va a valorar. Hazlo único y especial.";

    if (messageText) {
        let i = 0;
        function typeWriter() {
            if (i < fullMessage.length) {
                messageText.innerHTML += fullMessage.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Se inicia la animación después de 2 segundos.
        // Si quieres que inicie al hacer scroll a la sección, podemos añadir un IntersectionObserver.
        setTimeout(() => {
            typeWriter();
        }, 2000);
    }

    // 3. Funcionalidad del Lightbox para la Galería
    const clickableImages = document.querySelectorAll('.gallery-card .clickable-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (clickableImages.length > 0 && lightbox) {
        clickableImages.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'flex'; // Usamos flex para centrar
                lightboxImg.src = image.src;
                lightboxCaption.innerHTML = image.alt; // Usa el alt como caption
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Cierra el lightbox si se hace clic fuera de la imagen
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});






