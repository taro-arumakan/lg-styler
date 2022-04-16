function reveal_init() {
  reveal(0);
  split_text_to_characters();
}
function reveal_scroll() {
  reveal(80);
}
function reveal(offset) {
  var target_selector = offset === 0 ? "[class*=reveal_tran]:not(.reveal_fadein_letter)" : "[class*=reveal]";
  var windowHeight = window.innerHeight;
  var reveals = document.querySelectorAll(target_selector);
  reveals.forEach(reveal => {
    var elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - offset) {
      if (![...reveal.classList].includes('hidden')) {
        reveal.classList.add('active');
      }
    }
  });
}

function hide_profile() {
  var more_element = document.querySelector('.article-footer');
  var hide_elements = document.querySelectorAll('.hide_past_footer');
  hide_elements.forEach(he => {
    if (document.documentElement.scrollTop > more_element.offsetTop - window.screen.height / 2) {
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

function load_articles_container() {
  let includes = document.getElementsByTagName('include');
  [...includes].forEach(include => {
    load_file(include.attributes.src.value, function (text) {
      let el = document.createElement('html');
      text = text.replaceAll('src="assets/', 'src="../../assets/');
      text = text.replaceAll('src="articles/', 'src="../../articles/');
      el.innerHTML = text.replaceAll('href="articles/', 'href="../../articles/');
      include.insertAdjacentHTML('afterend',
        el.querySelector(`#${include.attributes.id.value}`).outerHTML);
    });
  });
}
function load_file(filename, callback) {
  fetch(filename).then(response => response.text()).then(text => callback(text));
}

function split_to_spans(n) {
    chars = n.textContent.replace(/\s+/g, "_").split("");
    spans = chars.map(s => "_" === s ? " " : `<span>${s}</span>`);
    spans = spans.map((s, i) => add_delay_style(s, i));
    return spans;
}
function add_delay_style(span, sequence) {
  if (span.match(/<span>/g)) {
    var ds = sequence * 3.2;
    o = 0 === ds ? "" : ` style="transition-delay: ${ds}ms;"`;
    span = span.replace(/<span>/, `<span${o}>`);
  }
  return span;
}
function split_text_to_characters() {
  let to_be_split = document.querySelectorAll('.text-split');
  [...to_be_split].forEach(ts_node => {
    spanned = split_to_spans(ts_node);
    ts_node.innerHTML = "".concat(...spanned);
  });
}

window.addEventListener("scroll", reveal_scroll);
window.onload = reveal_init;
