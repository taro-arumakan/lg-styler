function reveal_init() {
  text_split_nodes_to_delayed_spans();
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

function split_node_to_delayed_spans(n, interval) {
    chars = n.textContent.replace(/ +/g, " ").trim().split("");
    spans = chars.map(s => `<span>${s === '\n' ? '<br>': s}</span>`);
    spans = spans.map((s, i) => add_delay_style(s, i, interval));
    return spans;
}
function add_delay_style(span, sequence, interval) {
  if (span.match(/<span>/g)) {
    var ds = sequence * interval;
    o = 0 === ds ? "" : ` style="transition-delay: ${ds}ms;"`;
    span = span.replace(/<span>/, `<span${o}>`);
  }
  return span;
}
function text_split_nodes_to_delayed_spans() {
  let to_be_split = document.querySelectorAll('.reveal_fadein_letter');
  [...to_be_split].forEach(ts_node => {
    interval = 'delay_interval_ms' in ts_node.attributes ? parseFloat(ts_node.attributes.delay_interval_ms.value) : 30;
    spanned = split_node_to_delayed_spans(ts_node, interval);
    ts_node.innerHTML = "".concat(...spanned);
  });
}

window.addEventListener("scroll", reveal_scroll);
window.onload = reveal_init;
