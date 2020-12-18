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