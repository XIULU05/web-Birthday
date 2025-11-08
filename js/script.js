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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    function typeWriter() {
                        if (i < fullMessage.length) {
                            messageText.innerHTML += fullMessage.charAt(i);
                            i++;
                            setTimeout(typeWriter, 50);
                        }
                    }
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(messageText);
    }

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
        // Pequeña corrección para encontrar el 'alt' text de la imagen principal
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
    // Comprobamos si la librería particlesJS se ha cargado
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
});






