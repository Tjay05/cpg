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

// Sendng new message function
const handleSubmit = async (url, username, email, message) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name: username, email, message })
  })
  const data = await response.json();
  if(!response.ok) {
    console.log(data.error);
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

  handleSubmit('https://cpg-portfolio.onrender.com/contact', username, email, message);

})

async function loadMessages() {
  const container = document.getElementById('mssg-container');
  container.innerHTML = 'Loading messages...';

  try {
    const res = await fetch("https://cpg-portfolio.onrender.com/contacts")
    const messages = await res.json();

    container.innerHTML = messages.map(mssg => `
      <div class="mssg">
        <h3>${mssg.name}</h3>
        <p class="email">${mssg.email}</p>
        <p class="messg">${mssg.message}</p>
        <span class="timestamp">${new Date(mssg.receivedAt._seconds * 1000).toLocaleString()}</span>
      </div>
    `).join("");
  } catch (err) {
    container.innerHTML = "<p>Failed to load messages😪</p>";
    console.error(err);
  }
}

loadMessages()