// 1. Menú de música y reproducción
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
            // Opcional: Cerrar el menú al seleccionar una canción
            playlistMenu.classList.add('hidden'); 
        });
    });

    // 2. Galería de pilotos
    const galleryToggleBtn = document.getElementById('gallery-toggle-btn');
    const gallerySidebar = document.getElementById('gallery-sidebar');
    const closeBtn = document.querySelector('.close-btn');

    galleryToggleBtn.addEventListener('click', () => {
        gallerySidebar.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        gallerySidebar.classList.remove('open');
    });

    // 3. Mensaje personal
    const messageText = document.getElementById('message-text');
    const fullMessage = "Aquí va tu mensaje personal, letra por letra. Esto lo hará más especial para ella. Es lo que más va a valorar.";

    let i = 0;
    function typeWriter() {
        if (i < fullMessage.length) {
            messageText.innerHTML += fullMessage.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Ajusta la velocidad aquí
        }
    }

    // Inicia la animación del mensaje
    setTimeout(() => {
        typeWriter();
    }, 2000); // Espera 2 segundos antes de empezar a escribir
});






