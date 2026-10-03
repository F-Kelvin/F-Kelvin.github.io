// Mobile menu: opens and closes the navigation panel on small screens.
// The "js" class lets the stylesheet hide the menu only when this script is running,
// so the links stay visible if JavaScript fails to load.
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

  // Close after choosing a link so the page can scroll to the section.
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  // Close when tapping anywhere outside the header.
  document.addEventListener('click', function (event) {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });

  // Close with the Escape key and return focus to the menu button.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset when the window grows to laptop size, where the menu is always visible.
  var desktop = window.matchMedia('(min-width: 761px)');
  desktop.addEventListener('change', function (event) {
    if (event.matches) setOpen(false);
  });
});
