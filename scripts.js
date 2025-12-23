document.addEventListener('DOMContentLoaded', function () {
  var toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(function (btn) {
    var navBar = btn.closest('.nav-bar');
    var controlsId = btn.getAttribute('aria-controls');
    var navElements = navBar.querySelector('#' + controlsId);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navBar.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // if nav opens, focus first link for accessibility
      if (isOpen) {
        var firstLink = navElements && navElements.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
  });

  // Close open nav when clicking outside
  document.addEventListener('click', function (e) {
    var openNav = document.querySelector('.nav-bar.open');
    if (!openNav) return;
    if (!openNav.contains(e.target)) {
      openNav.classList.remove('open');
      var btn = openNav.querySelector('.nav-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close nav on resize when moving to wider screens
  window.addEventListener('resize', function () {
    if (window.innerWidth > 800) {
      document.querySelectorAll('.nav-bar.open').forEach(function (nb) {
        nb.classList.remove('open');
        var btn = nb.querySelector('.nav-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
});