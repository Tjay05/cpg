const hBurger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const offCanvas = document.getElementById('offside-canvas');

hBurger.addEventListener('click', function () {
  if (offCanvas.className === '') {
    offCanvas.className = 'offside-canvas';
    hBurger.classList.add('open');
    
    menu.addEventListener('click', () => {
      hBurger.classList.remove('open');
      offCanvas.classList.remove('offside-canvas');
    })
  } else {
    hBurger.classList.remove('open');
    offCanvas.classList.remove('offside-canvas');
  }
});
