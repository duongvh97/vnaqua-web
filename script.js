// =========================================
// 1. HIỆU ỨNG BONG BÓNG NƯỚC (HERO)
// =========================================
function createBubbles() {
    const container = document.getElementById('bubbles-container');
    if(!container) return;
    const bubbleCount = window.innerWidth < 768 ? 10 : 22;

    for (let i = 0; i < bubbleCount; i++) {
        let bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        let size = Math.random() * 40 + 10;
        let leftPosition = Math.random() * 100;
        let animationDuration = Math.random() * 8 + 4;
        let delay = Math.random() * 5;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${leftPosition}%`;
        bubble.style.animationDuration = `${animationDuration}s`;
        bubble.style.animationDelay = `${delay}s`;

        container.appendChild(bubble);
    }
}
createBubbles();

// =========================================
// 1.1 MENU MOBILE
// =========================================
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.getElementById('primary-nav');
const navLinks = document.querySelectorAll('.nav-links a');

if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        primaryNav.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                primaryNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// =========================================
// 2. HIỆU ỨNG STICKY HEADER & SCROLL REVEAL
// =========================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Chạy ngay khi tải trang

if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(el => revealObserver.observe(el));
}

// =========================================
// 3. LOGIC POPUP MODAL THÔNG SỐ SẢN PHẨM
// =========================================
const modal = document.getElementById("productModal");
const openModalBtns = document.querySelectorAll(".open-modal-btn");
const closeBtn = document.querySelector(".close-btn");

if(modal && closeBtn) {
    openModalBtns.forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            modal.classList.add("show");
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('show');
            if (primaryNav) {
                primaryNav.classList.remove('open');
            }
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

// =========================================
// 4. LOGIC SLIDER (CAROUSEL) HÌNH ẢNH KỸ THUẬT
// =========================================
const track = document.querySelector('.carousel-track');
const slides = track ? Array.from(track.children) : [];
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
let slideIndex = 0;
let autoPlayInterval;

if (track && slides.length > 0) {
    function moveToSlide(index) {
        if (index >= slides.length) slideIndex = 0;
        else if (index < 0) slideIndex = slides.length - 1;
        else slideIndex = index;
        
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            moveToSlide(slideIndex + 1);
            resetAutoPlay();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            moveToSlide(slideIndex - 1);
            resetAutoPlay();
        });
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            moveToSlide(slideIndex + 1);
        }, 3500); // Tự động cuộn sau 3.5s
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Bắt đầu chạy auto-play
    startAutoPlay();

    // Tạm dừng khi di chuột vào slider
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
}

// =========================================
// 5. LOGIC GALLERY GRID (PREV/NEXT + AUTO SCROLL)
// =========================================
const galleryGrid = document.getElementById('galleryGrid');
const galleryPrevBtn = document.querySelector('.gallery-prev');
const galleryNextBtn = document.querySelector('.gallery-next');
let galleryAutoPlay;

if (galleryGrid) {
    function setSwitchingState() {
        galleryGrid.classList.add('is-switching');
        setTimeout(() => {
            galleryGrid.classList.remove('is-switching');
        }, 220);
    }

    function moveGalleryNext() {
        const firstItem = galleryGrid.firstElementChild;
        if (!firstItem) return;
        setSwitchingState();
        galleryGrid.appendChild(firstItem);
    }

    function moveGalleryPrev() {
        const lastItem = galleryGrid.lastElementChild;
        if (!lastItem) return;
        setSwitchingState();
        galleryGrid.prepend(lastItem);
    }

    function startGalleryAutoPlay() {
        galleryAutoPlay = setInterval(moveGalleryNext, 3000);
    }

    function resetGalleryAutoPlay() {
        clearInterval(galleryAutoPlay);
        startGalleryAutoPlay();
    }

    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', () => {
            moveGalleryNext();
            resetGalleryAutoPlay();
        });
    }

    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', () => {
            moveGalleryPrev();
            resetGalleryAutoPlay();
        });
    }

    galleryGrid.addEventListener('mouseenter', () => clearInterval(galleryAutoPlay));
    galleryGrid.addEventListener('mouseleave', startGalleryAutoPlay);

    startGalleryAutoPlay();
}