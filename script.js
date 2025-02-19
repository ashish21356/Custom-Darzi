const images = [
  "images/hoding-3.png",
  "images/Hoding-2.png",
  "images/hoding-1.png"
];

let currentIndex = 0;

// Initialize Carousel
function initCarousel() {
  const carouselInner = document.getElementById('carousel-inner');
  const dotsContainer = document.getElementById('dots-container');

  // Clear previous carousel content
  carouselInner.innerHTML = '';
  dotsContainer.innerHTML = '';

  // Add images to carousel
  images.forEach((image, index) => {
    const div = document.createElement('div');
    div.classList.add('carousel-item');
    const img = document.createElement('img');
    img.src = image;
    img.alt = `Slide ${index + 1}`;
    div.appendChild(img);

    // Create dots for navigation
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);

    carouselInner.appendChild(div);
  });

  updateCarousel();
}

// Go to previous slide
function prevSlide() {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  updateCarousel();
}

// Go to next slide
function nextSlide() {
  currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  updateCarousel();
}

// Go to specific slide
function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

// Update the carousel and navigation dots
function updateCarousel() {
  const carouselInner = document.getElementById('carousel-inner');
  const dots = document.querySelectorAll('#dots-container .dot');

  // Move carousel to the correct slide
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update the dots
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentIndex) {
      dot.classList.add('active');
    }
  });
}

// Automatically change slide every 3 seconds
setInterval(() => {
  nextSlide();
}, 3000); // 3000 milliseconds = 3 seconds

// Initialize carousel on page load
window.onload = initCarousel;


