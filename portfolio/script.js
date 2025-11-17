const hBurger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const dropNav = document.getElementById('drop-nav');

const error = document.getElementById('error');
const success = document.getElementById('success');
const submitBtn = document.getElementById('submit-btn');
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


contactForm.addEventListener('submit', async (e) => {
  error.style.display = 'none';
  success.style.display = 'none';

  e.preventDefault();

  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const response = await fetch('https://cpg-portfolio.onrender.com/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name: username, email, message })
    })
    const data = await response.json();
    if (!response.ok) {
      console.log(data.error);
      error.textContent = data.error || "An unknown error occurred";
      error.style.display = 'block';
      return;
    }

    console.log(data);
    success.textContent = data.mssg;
    success.style.display = 'block';
    contactForm.reset();
    username.value = '';
    email.value = '';
    message.value = '';
  } catch (error) {
    error.textContent = "Failed to send message, check your internet connection";
    error.style.display = 'block';
    console.error(error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "send message";
}
})

async function loadMessages() {
  const container = document.getElementById('mssg-container');
  container.innerHTML = 'Loading messages...';

  try {
    const res = await fetch("https://cpg-portfolio.onrender.com/contacts")
    const messages = await res.json();

    if (messages.length === 0) {
      container.innerHTML = "<p>No messages yet!</p>";
      return;
    }

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