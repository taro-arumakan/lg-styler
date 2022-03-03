function reveal() {
  var windowHeight = window.innerHeight;
  var elementVisible = 150;
  var reveals = document.querySelectorAll(".reveal");
  reveals.forEach(reveal => {
    var elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
}

window.addEventListener("scroll", reveal);
window.onload = reveal;
