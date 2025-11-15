const hBurger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const dropNav = document.getElementById('drop-nav');

const contactForm = document.getElementById('contact-form');

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

const handleSubmit = async (url, username, email, message) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name: username, email, message })
  })
  const data = await response.json();
  if(!response.ok) {
    console.log('Error while fetching');
  }
  if (response.ok) {
    console.log(data);
  }
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  handleSubmit('http://localhost:4000/form', username, email, message);

})