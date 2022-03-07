function reveal() {
  var windowHeight = window.innerHeight;
  var elementVisible = 150;
  var reveals = document.querySelectorAll(".reveal");
  reveals.forEach(reveal => {
    var elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      if (![...reveal.classList].includes('hidden')) {
        reveal.classList.add('active');
      }
    }
  });
}
window.addEventListener("scroll", reveal);
window.onload = reveal;

function hide_profile() {
  var more_element = document.querySelector('.article-footer');
  var hide_elements = document.querySelectorAll('.hide_past_footer');
  hide_elements.forEach(he => {
    if (document.documentElement.scrollTop > more_element.offsetTop){
      if (![...he.classList].includes('hidden')) {
        he.classList.remove('active');
        he.classList.add('hidden');
      }
    } else {
      he.classList.remove('hidden');
      he.classList.add('active');
    }
  })
}