const hBurger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const dropNav = document.getElementById('drop-nav');

hBurger.addEventListener('click', function () {
  if (dropNav.className === '') {
    dropNav.className = 'drop-nav';
    hBurger.classList.add('open');
    
    menu.addEventListener('click', () => {
      hBurger.classList.remove('open');
      dropNav.classList.remove('drop-nav');
    })
  } else {
    hBurger.classList.remove('open');
    dropNav.classList.remove('drop-nav');
  }
});
