// click event for items in hamburger menu
const mobileLinks = document.querySelectorAll('.mobile-links > *');

mobileLinks.forEach(element => {
  element.addEventListener('click', () => {
    // trigger close menu button for mobile
    document.getElementById("menu-checkbox").click();
  });
});


const form = document.getElementById('contact-form');
const userName = document.getElementById('name');

const formSuccess = {
  messageHeader: 'Thank you Anna',
  message: 'Your message has been sent. I will reach out to you as soon as possible.',
  icon: 'checked.svg',
  actionText: 'close',
};

const formFail = {
  messageHeader: 'Whoops!',
  message: "Something went wrong. Let's give this another try",
  icon: 'retry.svg',
  actionText: 'retry',
}

const buildStatus = (status) => {
  const formParentContainer = document.querySelector('.contact');
  const footer = document.getElementById('contact-me');
  formParentContainer.classList.add('blur');

  const container = document.createElement('div');
  container.classList.add('form-status', 'container', 'centered');

  container.innerHTML = `
  <img src="./img/${status.icon}" alt="check icon" class="check-icon"/>
  <div class="message">
    <h1>${status.messageHeader}</h1>
    <p>${status.message}</p>
  </div>
  <button class="close-btn">${status.actionText}</button>
  `
  footer.appendChild(container);
}

buildStatus(formSuccess);

const submitForm = () => {
  const XHR = new XMLHttpRequest();
  const FD = new FormData(form);

  // succesful
  XHR.addEventListener('load', (e) => {
    alert(e.target.responseText);
  });

  // unsuccesful
  XHR.addEventListener('error', (e) => {
    alert('Oops! Something went wrong.');
  });

  // set up request
  XHR.open('POST', 'https://formspree.io/f/xdoppzgd');
  XHR.setRequestHeader("Accept", "application/json");

  // send data
  XHR.send(FD);
};

// redirect message when contact form is submitted
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  submitForm();
});
