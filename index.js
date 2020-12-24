// click event for items in hamburger menu
const mobileLinks = document.querySelectorAll('.mobile-links > *');

mobileLinks.forEach(element => {
  element.addEventListener('click', () => {
    // trigger close menu button for mobile
    document.getElementById("menu-checkbox").click();
  });
});

// redirect message when contact form is submitted
// const submitBtn = document.getElementById('submit-btn');

// submitBtn.addEventListener('click', (e) => {
//   console.log('submitted');
// });