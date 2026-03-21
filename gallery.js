/* ================= GALLERY GRID & LIGHTBOX ================= */

const grid = document.getElementById('image-grid');
const imagePaths = [];

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentIndex = 0;

if (grid) {
    /* ===== 1. Collect GALLERY images exclusively from images/gallery/ ===== */
    const rawFiles = [
        "hero1.jpg", "hero2.jpg", "hero3.jpg", "hero4.jpg", "hero5.jpg", "hero6.jpg", "hero7.jpg", "hero8.jpg",
        "img1.jpg", "img10.JPG", "img11.JPG", "img12.jpg", "img13.jpg", "img14.jpg", "img15.jpg",
        "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg"
    ];

    rawFiles.forEach((filename) => {
        imagePaths.push(`images/gallery/${filename}`);
    });

    /* ===== 2. Inject Images with Lazy Loading ===== */
    imagePaths.forEach((src, index) => {
        const img = document.createElement('img');
        img.classList.add('gallery-item');
        img.setAttribute('loading', 'lazy'); // Lazy load for performance
        img.setAttribute('decoding', 'async'); // Prevent main thread blocking on decode
        img.src = src;
        img.dataset.index = index;

        // Apply smooth fade-in after loading is fully complete
        img.onload = () => {
            img.classList.add('loaded');
        };

        // Lightbox Trigger
        img.addEventListener('click', () => {
            openLightbox(index);
        });

        grid.appendChild(img);
    });
}

// Lightbox Logic Operations
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = imagePaths[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop scrolling behind overlay
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; 
    setTimeout(() => { lightboxImg.src = ''; }, 300); // clear src post-fade
}

function showNext() {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    lightboxImg.src = imagePaths[currentIndex];
}

function showPrev() {
    currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
    lightboxImg.src = imagePaths[currentIndex];
}

// Event Listeners (Existence safety checks)
if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
if(nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
if(prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

// Click on literal overlay background to close
if(lightbox) {
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            closeLightbox();
        }
    });

    // Arrow keys / Esc UX
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // Touch Swipe Logic for Mobile natively
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) showNext(); // Swipe left (go next)
        if (touchEndX > touchStartX + 50) showPrev(); // Swipe right (go prev)
    }
}
