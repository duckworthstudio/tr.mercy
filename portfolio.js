// =========================================================
// MERCY'S CLASSROOM — Site Script
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById('nav-toggle');
  var tabs = document.getElementById('nav-tabs');

  if (toggle && tabs) {
    toggle.addEventListener('click', function () {
      var isOpen = tabs.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    tabs.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        tabs.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  // ---- Active nav link ----
  var navLinks = document.querySelectorAll('#nav-tabs a');
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href.startsWith('#'))) {
      // Section links only get "active" via scroll spy on the homepage;
      // page links (blog.html, project.html) get it via exact match.
    }
    if (!href.startsWith('#') && href === currentPath) {
      link.classList.add('active');
    }
  });

  // Scroll-spy for in-page sections on the homepage
  var sections = document.querySelectorAll('main section[id], section[id]');
  if (currentPath === 'index.html' || currentPath === '') {
    var sectionLinks = Array.prototype.filter.call(navLinks, function (l) {
      return l.getAttribute('href').startsWith('#');
    });

    if ('IntersectionObserver' in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.getAttribute('id');
          var match = sectionLinks.filter(function (l) {
            return l.getAttribute('href') === '#' + id;
          })[0];
          if (entry.isIntersecting) {
            sectionLinks.forEach(function (l) { l.classList.remove('active'); });
            if (match) match.classList.add('active');
          }
        });
      }, { rootMargin: '-45% 0px -45% 0px' });

      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  // ---- Gallery carousel ----
  var track = document.getElementById('carousel-track');

  if (track) {
    var slides = track.querySelectorAll('.carousel-slide');
    var prevBtn = document.getElementById('carousel-prev');
    var nextBtn = document.getElementById('carousel-next');
    var dotsWrap = document.getElementById('carousel-dots');
    var current = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Go to photo ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    var dots = dotsWrap.querySelectorAll('button');

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });
  }

  // ---- Back to top button ----
  var backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 420) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Navbar shadow once page has scrolled ----
  var navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ---- Contact form (front-end only demo) ----
  var form = document.getElementById('contact-form');
  var sentMsg = document.getElementById('sent-msg');

  if (form && sentMsg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sentMsg.style.display = 'block';
      form.reset();
    });
  }

});








// handle form submittion data

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxafpNf1tUj3c_50qbVqpstgvjFafHBWxvFTWZXHAnATQ8adMNPVIqAqPxuJi3J7NsX/exec";


const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const sentMsg = document.getElementById("sent-msg");


form.addEventListener("submit", async function(event) {

  event.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  sentMsg.hidden = true;


  // Get form values.
  const name =
    document.getElementById("name").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const message =
    document.getElementById("message").value.trim();


  // Basic frontend validation.
  if (!name || !email || !message) {

    showMessage(
      "Please complete all fields.",
      false
    );

    resetButton();
    return;
  }


  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (!emailPattern.test(email)) {

    showMessage(
      "Please enter a valid email address.",
      false
    );

    resetButton();
    return;
  }


  const payload = {
    name: name,
    email: email,
    message: message
  };


  try {

    const response = await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",

        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },

        body: JSON.stringify(payload)
      }
    );


    const result = await response.json();


    if (!result.success) {

      throw new Error(
        result.error ||
        "Unable to send your message."
      );

    }


    // Email has been sent successfully.
    showMessage(
      "Thanks! Your note has been sent. 💌",
      true
    );


    form.reset();


    /*
      Open WhatsApp with the same submission.

      This does NOT automatically send the message.
      The visitor will see the WhatsApp conversation
      with the message already typed and can press Send.
    */
    if (result.whatsappUrl) {

      window.open(
        result.whatsappUrl,
        "_blank"
      );

    }


  } catch (error) {

    console.error(error);

    showMessage(
      "Sorry, your message could not be sent. Please try again.",
      false
    );

  }


  resetButton();

});


function showMessage(message, success) {

  sentMsg.textContent = message;

  sentMsg.hidden = false;

}


function resetButton() {

  submitBtn.disabled = false;

  submitBtn.textContent = "Send Note";

}