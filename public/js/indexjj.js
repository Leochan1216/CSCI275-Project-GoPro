const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const leftButton = document.querySelector('.carousel-btn.left');
const rightButton = document.querySelector('.carousel-btn.right');
let currentIndex = 0;

// Function to update the carousel
function updateCarousel(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

// Function for navigation buttons
function moveToNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel(currentIndex);
}

function moveToPreviousSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel(currentIndex);
}

// Event listeners for navigation buttons
leftButton.addEventListener('click', moveToPreviousSlide);
rightButton.addEventListener('click', moveToNextSlide);

// Auto-scroll every 5 seconds
setInterval(moveToNextSlide, 10000);