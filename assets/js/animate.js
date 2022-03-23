function reveal_init() {
  reveal(0);
}
function reveal_scroll() {
  reveal(80);
}
function reveal(offset) {
  var windowHeight = window.innerHeight;
  var reveals = document.querySelectorAll("[class*=reveal]");
  reveals.forEach(reveal => {
    var elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - offset) {
      if (![...reveal.classList].includes('hidden')) {
        reveal.classList.add('active');
      }
    }
  });
}
window.addEventListener("scroll", reveal_scroll);
window.onload = reveal_init;

function hide_profile() {
  var more_element = document.querySelector('.article-footer');
  var hide_elements = document.querySelectorAll('.hide_past_footer');
  hide_elements.forEach(he => {
    if (document.documentElement.scrollTop > more_element.offsetTop - window.screen.height / 2){
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