// hover effects on projects
const projects = document.querySelectorAll('.project');
const projectContent = document.querySelectorAll('.project-details');

projects.forEach((element, index) => {
  element.addEventListener("mouseleave", () => {
    projectContent[index].classList.remove('reveal');
  });

  element.addEventListener("mouseenter", () => {
    projectContent[index].classList.add('reveal');
  });
});


// click event for items in hamburger menu
const mobileLinks = document.querySelectorAll('.mobile-links > *');

mobileLinks.forEach(element => {
  element.addEventListener('click', () => {
    // trigger close menu button for mobile
    document.getElementById("menu-checkbox").click();
  });
});