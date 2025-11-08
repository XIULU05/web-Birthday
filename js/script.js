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

    // 2. Funcionalidad de los Reproductores de Audio Ocultos
    const audioPlayers = document.querySelectorAll('.audio-player');
    let currentAudio = null; 

    audioPlayers.forEach(player => {
        const audioSrc = player.getAttribute('data-audio');
        if (!audioSrc) return; // Salta si no tiene data-audio (como el de la pista)
        const audio = new Audio(audioSrc);

        player.addEventListener('click', () => {
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause(); 
                const oldPlayer = document.querySelector(`button[data-audio="${currentAudio.src.substring(currentAudio.src.lastIndexOf('/') + 1)}"]`);
                if(oldPlayer) {
                    oldPlayer.innerHTML = '<i class="fas fa-play"></i> Escuchar Recuerdo';
                }
            }

            if (audio.paused) {
                audio.play();
                player.innerHTML = '<i class="fas fa-pause"></i> Pausar Recuerdo';
                currentAudio = audio;
            } else {
                audio.pause();
                player.innerHTML = '<i class="fas fa-play"></i> Escuchar Recuerdo';
                currentAudio = null;
            }

            audio.onended = () => {
                player.innerHTML = '<i class="fas fa-play"></i> Escuchar Recuerdo';
                currentAudio = null;
            };
        });
    });


    // 3. Funcionalidad del Lightbox (Mejorado con Galería)
    const clickableImages = document.querySelectorAll('.clickable-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevButton = document.querySelector('.lightbox-nav.prev');
    const nextButton = document.querySelector('.lightbox-nav.next');

    let currentGallery = [];
    let currentIndex = 0;

    function showImage(index) {
        const imageName = currentGallery[index];
        const imageElement = document.querySelector(`img[src='${imageName}'], img[data-gallery*='${imageName}']`);
        
        lightboxImg.src = imageName;
        lightboxCaption.innerHTML = imageElement ? imageElement.alt : `Imagen ${index + 1} de ${currentGallery.length}`;
    }

    if (clickableImages.length > 0 && lightbox) {
        clickableImages.forEach(image => {
            image.addEventListener('click', () => {
                const mainImageSrc = image.getAttribute('src');
                const galleryData = image.getAttribute('data-gallery');
                
                currentGallery = [mainImageSrc];
                if (galleryData) {
                    currentGallery = currentGallery.concat(galleryData.split(','));
                }

                currentIndex = 0;
                lightbox.style.display = 'flex';
                showImage(currentIndex);

                if (currentGallery.length > 1) {
                    prevButton.style.display = 'block';
                    nextButton.style.display = 'block';
                } else {
                    prevButton.style.display = 'none';
                    nextButton.style.display = 'none';
                }
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (event) => {
            if (event.target !== lightboxImg && event.target !== prevButton && event.target !== nextButton) {
                closeLightbox();
            }
        });

        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentGallery.length - 1;
            showImage(currentIndex);
        });

        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex < currentGallery.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
        });
    }

    // 4. Animación de la Línea de Tiempo al hacer Scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // 5. INICIALIZACIÓN DE PARTICLES.JS
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#FFC000"
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                    }
                },
                "line_linked": {
                    "enable": false,
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                    },
                    "onclick": {
                        "enable": false,
                    },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    } else {
        console.error('Error: particles.js no se ha cargado correctamente.');
    }

    // ========= 6. LÓGICA DE PANTALLA DE BLOQUEO (CORREGIDA) =========
    const lockScreen = document.getElementById('lock-screen');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');
    const audioHint = document.getElementById('audio-hint');
    const hintAudio = new Audio('audio/contraseña.mp3');

    // Aceptamos ambas contraseñas por seguridad
    const correctPassword1 = "9/11/2025";
    const correctPassword2 = "09/11/2025";
    let attempts = 0;

    // ELIMINAMOS el formateo automático de fecha. Es más simple y seguro.
    
    // Lógica al presionar "Entrar"
    passwordSubmit.addEventListener('click', () => {
        const inputPassword = passwordInput.value.trim(); // Limpiamos espacios
        
        if (inputPassword === correctPassword1 || inputPassword === correctPassword2) {
            // Éxito
            lockScreen.classList.add('hidden');
        } else {
            // Fallo
            attempts++;
            passwordInput.value = ""; // Limpia el campo para reintentar
            passwordError.classList.remove('hidden');

            if (attempts === 1) {
                // Tu pista 1
                passwordError.textContent = "¡Ups! Pista: ¿qué día es que cumple años mi querida emperatriz? (Formato: DD/MM/YYYY)";
            } else if (attempts === 2) {
                // Tu pista 2 (más coqueta)
                passwordError.textContent = "¡Casi! Te dejo ser más coqueta. ¿Cuál es la fecha de la campeona? (Usa las barras / )";
            } else {
                // Pista final con audio
                passwordError.textContent = "¡Uy! Parece que estás atascada. Escucha esta pista de audio.";
                audioHint.classList.remove('hidden');
            }
        }
    });

    // Lógica para el botón de audio
    audioHint.addEventListener('click', () => {
        if (hintAudio.paused) {
            hintAudio.play();
            audioHint.innerHTML = '<i class="fas fa-pause"></i> Pausar Pista';
        } else {
            hintAudio.pause();
            hintAudio.currentTime = 0;
            audioHint.innerHTML = '<i class="fas fa-play"></i> Pista de audio';
        }

        hintAudio.onended = () => {
            audioHint.innerHTML = '<i class="fas fa-play"></i> Pista de audio';
        };
    });

});