document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!header || !toggle || !nav) return;

  function isOpen() {
    return header.classList.contains('open');
  }

  function setOpen(open) {
    header.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!isOpen());
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('click', function (event) {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  var desktop = window.matchMedia('(min-width: 761px)');
  desktop.addEventListener('change', function (event) {
    if (event.matches) setOpen(false);
  });
});
