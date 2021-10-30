// click event for items in hamburger menu
const mobileLinks = document.querySelectorAll('.mobile-links > *');

mobileLinks.forEach(element => {
  element.addEventListener('click', () => {
    // trigger close menu button for mobile
    document.getElementById('menu-checkbox').click();
  });
});

const contactContainer = document.querySelector('.contact');
const formParentContainer = document.querySelector('.contact');
const form = document.getElementById('contact-form');
const emailTooltip = document.querySelector('.tooltp-email');
const nameTooltip = document.querySelector('.tooltp-name');
let formUserName;
let formUserEmail;

const spinner = document.querySelector('.loading');

const formSuccess = {
  messageHeader: (userName) => `Thank You ${userName}`,
  message: 'Your message has been sent. I will reach out to you as soon as possible.',
  icon: 'checked.svg',
  actionText: 'close',
};

const formFail = {
  messageHeader: (userName) => `Whoops! Sorry ${userName}`,
  message: "Something went wrong. Let's give this another try",
  icon: 'retry.svg',
  actionText: 'retry',
};

const clearToolTips = () => {
  // reset tooltips
  emailTooltip.textContent = '';
  emailTooltip.classList.add('d-none');
  nameTooltip.textContent = '';
  nameTooltip.classList.add('d-none');
};

const validate = (email, nm) => {
  clearToolTips();
  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      emailTooltip.textContent = '*enter valid email address';
      emailTooltip.classList.remove('d-none');
      return false;
    }

    return true;
  };

  const validateName = () => {
    const re = /^[a-zA-Z,. -]{2,40}$/;
    if (!re.test(nm)) {
      nameTooltip.textContent = '*must be 2-40 characters & only (.,-) symbols allowed';
      nameTooltip.classList.remove('d-none');
      return false;
    }

    return true;
  };

  const emailisValid = validateEmail();
  const nameisValid = validateName();
  if (emailisValid && nameisValid) { return true; }
  return false;
};

const buildStatus = (status) => {
  const footer = document.getElementById('contact-me');

  const container = document.createElement('div');
  const actionBtn = document.createElement('button');

  container.classList.add('form-status', 'container', 'centered');
  actionBtn.classList.add('close-btn');

  container.innerHTML = `
  <img src="./img/${status.icon}" class="check-icon"/>
  <div class="message">
    <h1>${status.messageHeader(document.getElementById('name').value)}</h1>
    <p>${status.message}</p>
  </div>
  `;

  actionBtn.textContent = status.actionText;

  container.appendChild(actionBtn);
  footer.appendChild(container);

  actionBtn.addEventListener('click', () => {
    footer.removeChild(container);
    formParentContainer.classList.remove('blur');
    contactContainer.classList.remove('unclickable');
  });
};

const submitForm = () => {
  const XHR = new XMLHttpRequest();
  const FD = new FormData(form);

  const send = () => {
    // set up request
    XHR.open('POST', 'https://formspree.io/f/xnqoozry');
    XHR.setRequestHeader('Accept', 'application/json');

    // send data
    XHR.send(FD);
  };

  // succesful
  XHR.addEventListener('load', () => {
    spinner.classList.add('d-none');
    buildStatus(formSuccess);
    form.reset();
  });

  // unsuccesful
  XHR.addEventListener('error', () => {
    spinner.classList.add('d-none');
    buildStatus(formFail);
  });

  send();
};

// redirect message when contact form is submitted
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  formUserName = document.getElementById('name').value;
  formUserEmail = document.getElementById('email').value;

  if (validate(formUserEmail, formUserName)) {
    formParentContainer.classList.add('blur');
    spinner.classList.remove('d-none');
    contactContainer.classList.add('unclickable');

    setTimeout(submitForm, 1000);
  }
});
