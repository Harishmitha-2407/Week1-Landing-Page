/* Week 1 - Lumen landing page interactivity (vanilla JS, no dependencies) */
(function () {
  'use strict';

  // ---- 1. Responsive menu toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open)); // keeps screen readers in sync
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    // Close after choosing a link (better mobile UX)
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    // Escape closes the menu and returns focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    // Reset the state when resizing up to desktop layout
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function () { setMenu(false); });
  }

  // ---- 2. Signup form validation ----
  var form = document.getElementById('signup-form');
  var msg = document.getElementById('form-msg');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.elements.email;
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      input.setAttribute('aria-invalid', String(!valid));
      msg.className = 'form-msg ' + (valid ? 'ok' : 'error');
      msg.textContent = valid ? 'Thanks! You are on the list.' : 'Please enter a valid email address.';
      if (valid) form.reset(); else input.focus();
    });
  }

  // ---- 3. Footer year ----
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
