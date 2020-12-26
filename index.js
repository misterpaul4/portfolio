// click event for items in hamburger menu
const mobileLinks = document.querySelectorAll('.mobile-links > *');

mobileLinks.forEach(element => {
  element.addEventListener('click', () => {
    // trigger close menu button for mobile
    document.getElementById("menu-checkbox").click();
  });
});

const formParentContainer = document.querySelector('.contact');
const form = document.getElementById('contact-form');
const spinner = document.querySelector('.loading');

const formSuccess = {
  messageHeader: (userName) => `Thanks ${userName}`,
  message: 'Your message has been sent. I will reach out to you as soon as possible.',
  icon: 'checked.svg',
  actionText: 'close',
};

const formFail = {
  messageHeader: (userName) => `Whoops! Sorry ${userName}`,
  message: "Something went wrong. Let's give this another try",
  icon: 'retry.svg',
  actionText: 'retry',
}


const buildStatus = (status) => {
  const footer = document.getElementById('contact-me');

  const container = document.createElement('div');
  const actionBtn = document.createElement('button');

  container.classList.add('form-status', 'container', 'centered');
  actionBtn.classList.add('close-btn');

  container.innerHTML = `
  <img src="./img/${status.icon}" alt="check icon" class="check-icon"/>
  <div class="message">
    <h1>${status.messageHeader(document.getElementById('name').value)}</h1>
    <p>${status.message}</p>
  </div>
  `

  actionBtn.textContent = status.actionText;

  container.appendChild(actionBtn);
  footer.appendChild(container);

  actionBtn.addEventListener('click', () => {
    footer.removeChild(container);
    formParentContainer.classList.remove('blur');
  });
};

const submitForm = () => {
  spinner.classList.add('d-none');

  const XHR = new XMLHttpRequest();
  const FD = new FormData(form);

  const send = () => {
    // set up request
    XHR.open('POST', 'https://formspree.io/f/xdoppzgd');
    XHR.setRequestHeader("Accept", "application/json");

    // send data
    XHR.send(FD);
  };

  // succesful
  XHR.addEventListener('load', (e) => {
    buildStatus(formSuccess);
    form.reset();
  });

  // unsuccesful
  XHR.addEventListener('error', (e) => {
    buildStatus(formFail);
  });

  send();
};

// redirect message when contact form is submitted
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formParentContainer.classList.add('blur');
  spinner.classList.remove('d-none');
  setTimeout(submitForm, 4000);
});
