/* ================= FADE CAROUSEL ================= */

const slides = document.querySelectorAll('#hero-carousel .carousel-image');
let current = 0;

function showNextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}

// Start with first image active
slides[0].classList.add('active');

// Change every 3.5 seconds
setInterval(showNextSlide, 3500);