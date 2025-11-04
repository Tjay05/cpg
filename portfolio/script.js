const hBurger = document.getElementById('hamburger');
const offCanvas = document.getElementById('offside-canvas');

hBurger.addEventListener('click', function () {
  if (offCanvas.className === 'hidden') {
    offCanvas.className = 'offside-canvas';
    hBurger.classList.add('open');
  } else {
    offCanvas.className = 'hidden';
    hBurger.classList.remove('open');
  }
})