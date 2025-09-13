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

        setTimeout(() => {
            typeWriter();
        }, 2000);
    }
});






