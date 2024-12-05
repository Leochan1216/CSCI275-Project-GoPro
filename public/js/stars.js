const stars = document.querySelectorAll('.star-rating .fa-star');

stars.forEach((star) => {
  // Highlight stars on hover
  star.addEventListener('mouseover', () => {
    resetHover(); // Clear hover highlights
    const value = parseInt(star.dataset.value, 10); // Get hovered star value
    highlightStars(value, 'hover'); // Highlight up to hovered star
  });

  // Remove hover effect
  star.addEventListener('mouseout', () => {
    resetHover(); // Clear hover highlights
  });

  // Set selected stars on click
  star.addEventListener('click', () => {
    resetSelection(); // Clear previous selection
    const value = parseInt(star.dataset.value, 10); // Get clicked star value
    highlightStars(value, 'selected'); // Mark stars as selected
  });
});

// Helper functions
function resetHover() {
  stars.forEach((star) => {
    if (!star.classList.contains('selected')) {
      star.classList.remove('hover');
    }
  });
}

function resetSelection() {
  stars.forEach((star) => star.classList.remove('selected'));
}

function highlightStars(value, className) {
  for (let i = 0; i < value; i++) {
    stars[i].classList.add(className);
  }
}