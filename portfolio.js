// =========================================================
// MERCY'S CLASSROOM — Site Script
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // -------------------------------------------------------
  // Google Apps Script
  // -------------------------------------------------------

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxafpNf1tUj3c_50qbVqpstgvjFafHBWxvFTWZXHAnATQ8adMNPVIqAqPxuJi3J7NsX/exec";


  // -------------------------------------------------------
  // Mobile nav toggle
  // -------------------------------------------------------

  var toggle = document.getElementById('nav-toggle');
  var tabs = document.getElementById('nav-tabs');

  if (toggle && tabs) {

    toggle.addEventListener('click', function () {

      var isOpen = tabs.classList.toggle('open');

      toggle.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
      );

    });


    tabs.querySelectorAll('a').forEach(function (link) {

      link.addEventListener('click', function () {

        tabs.classList.remove('open');

        toggle.setAttribute(
          'aria-expanded',
          'false'
        );

      });

    });

  }


  // -------------------------------------------------------
  // Scroll reveal
  // -------------------------------------------------------

  var revealEls =
    document.querySelectorAll('.reveal');


  if (
    'IntersectionObserver' in window &&
    revealEls.length
  ) {

    var observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                'in-view'
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealEls.forEach(function (el) {

      observer.observe(el);

    });


  } else {

    revealEls.forEach(function (el) {

      el.classList.add('in-view');

    });

  }


  // -------------------------------------------------------
  // Active nav link
  // -------------------------------------------------------

  var navLinks =
    document.querySelectorAll('#nav-tabs a');


  var currentPath =
    window.location.pathname
      .split('/')
      .pop() || 'index.html';


  navLinks.forEach(function (link) {

    var href =
      link.getAttribute('href');


    if (
      href === currentPath ||
      (
        currentPath === 'index.html' &&
        href.startsWith('#')
      )
    ) {

      // Section links use scroll spy.
      // Page links use exact matching.

    }


    if (
      !href.startsWith('#') &&
      href === currentPath
    ) {

      link.classList.add('active');

    }

  });


  // -------------------------------------------------------
  // Scroll spy for homepage sections
  // -------------------------------------------------------

  var sections =
    document.querySelectorAll(
      'main section[id], section[id]'
    );


  if (
    currentPath === 'index.html' ||
    currentPath === ''
  ) {

    var sectionLinks =
      Array.prototype.filter.call(
        navLinks,
        function (l) {

          return l
            .getAttribute('href')
            .startsWith('#');

        }
      );


    if (
      'IntersectionObserver' in window &&
      sections.length
    ) {

      var spy =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(function (entry) {

              var id =
                entry.target.getAttribute(
                  'id'
                );


              var match =
                sectionLinks.filter(
                  function (l) {

                    return (
                      l.getAttribute('href') ===
                      '#' + id
                    );

                  }
                )[0];


              if (entry.isIntersecting) {

                sectionLinks.forEach(
                  function (l) {

                    l.classList.remove(
                      'active'
                    );

                  }
                );


                if (match) {

                  match.classList.add(
                    'active'
                  );

                }

              }

            });

          },
          {
            rootMargin:
              '-45% 0px -45% 0px'
          }
        );


      sections.forEach(function (s) {

        spy.observe(s);

      });

    }

  }


  // -------------------------------------------------------
  // Gallery carousel
  // -------------------------------------------------------

  var track =
    document.getElementById(
      'carousel-track'
    );


  if (track) {

    var slides =
      track.querySelectorAll(
        '.carousel-slide'
      );


    var prevBtn =
      document.getElementById(
        'carousel-prev'
      );


    var nextBtn =
      document.getElementById(
        'carousel-next'
      );


    var dotsWrap =
      document.getElementById(
        'carousel-dots'
      );


    var current = 0;


    slides.forEach(function (_, i) {

      var dot =
        document.createElement(
          'button'
        );


      dot.type = 'button';


      dot.setAttribute(
        'aria-label',
        'Go to photo ' + (i + 1)
      );


      if (i === 0) {

        dot.classList.add(
          'active'
        );

      }


      dot.addEventListener(
        'click',
        function () {

          goTo(i);

        }
      );


      if (dotsWrap) {

        dotsWrap.appendChild(dot);

      }

    });


    var dots =
      dotsWrap
        ? dotsWrap.querySelectorAll(
            'button'
          )
        : [];


    function goTo(index) {

      if (!slides.length) {
        return;
      }


      current =
        (index + slides.length) %
        slides.length;


      track.style.transform =
        'translateX(-' +
        (current * 100) +
        '%)';


      dots.forEach(function (d, i) {

        d.classList.toggle(
          'active',
          i === current
        );

      });

    }


    if (prevBtn) {

      prevBtn.addEventListener(
        'click',
        function () {

          goTo(current - 1);

        }
      );

    }


    if (nextBtn) {

      nextBtn.addEventListener(
        'click',
        function () {

          goTo(current + 1);

        }
      );

    }

  }


  // -------------------------------------------------------
  // Back to top button
  // -------------------------------------------------------

  var backToTop =
    document.getElementById(
      'back-to-top'
    );


  if (backToTop) {

    window.addEventListener(
      'scroll',
      function () {

        if (window.scrollY > 420) {

          backToTop.classList.add(
            'show'
          );

        } else {

          backToTop.classList.remove(
            'show'
          );

        }

      }
    );


    backToTop.addEventListener(
      'click',
      function () {

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      }
    );

  }


  // -------------------------------------------------------
  // Navbar shadow after scrolling
  // -------------------------------------------------------

  var navbar =
    document.querySelector('.navbar');


  if (navbar) {

    window.addEventListener(
      'scroll',
      function () {

        if (window.scrollY > 10) {

          navbar.classList.add(
            'scrolled'
          );

        } else {

          navbar.classList.remove(
            'scrolled'
          );

        }

      }
    );

  }


  // -------------------------------------------------------
  // CONTACT FORM
  // Google Apps Script → Email
  // -------------------------------------------------------

  var form =
    document.getElementById(
      'contact-form'
    );


  var sentMsg =
    document.getElementById(
      'sent-msg'
    );


  var submitBtn =
    document.getElementById(
      'submit-btn'
    );


  if (
    form &&
    sentMsg &&
    submitBtn
  ) {

    form.addEventListener(
      'submit',
      async function (event) {

        event.preventDefault();


        // Prevent double submissions.
        submitBtn.disabled = true;

        submitBtn.textContent =
          'Sending...';


        sentMsg.hidden = true;


        // -----------------------------------------------
        // Get form values
        // -----------------------------------------------

        var name =
          document
            .getElementById('name')
            .value
            .trim();


        var email =
          document
            .getElementById('email')
            .value
            .trim();


        var message =
          document
            .getElementById('message')
            .value
            .trim();


        // -----------------------------------------------
        // Basic validation
        // -----------------------------------------------

        if (
          !name ||
          !email ||
          !message
        ) {

          showMessage(
            'Please complete all fields.'
          );

          resetButton();

          return;

        }


        // -----------------------------------------------
        // Email validation
        // -----------------------------------------------

        var emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
          !emailPattern.test(email)
        ) {

          showMessage(
            'Please enter a valid email address.'
          );

          resetButton();

          return;

        }


        // -----------------------------------------------
        // Prepare data
        // -----------------------------------------------

        var payload = {

          name: name,

          email: email,

          message: message

        };


        // -----------------------------------------------
        // Send to Google Apps Script
        // -----------------------------------------------

        try {

          var response =
            await fetch(
              GOOGLE_SCRIPT_URL,
              {

                method: 'POST',

                headers: {

                  'Content-Type':
                    'text/plain;charset=utf-8'

                },

                body:
                  JSON.stringify(
                    payload
                  )

              }
            );


          var result =
            await response.json();


          // ---------------------------------------------
          // Check response
          // ---------------------------------------------

          if (!result.success) {

            throw new Error(
              result.error ||
              'Unable to send your message.'
            );

          }


          // ---------------------------------------------
          // Success
          // ---------------------------------------------

          showMessage(
            'Thanks! Your note has been sent. 💌'
          );


          form.reset();


        } catch (error) {

          console.error(
            'Contact form error:',
            error
          );


          showMessage(
            'Sorry, your message could not be sent. Please try again.'
          );

        }


        resetButton();

      }
    );

  }


  // -------------------------------------------------------
  // Contact form helper functions
  // -------------------------------------------------------

  function showMessage(message) {

    sentMsg.textContent =
      message;

    sentMsg.hidden = false;

  }


  function resetButton() {

    submitBtn.disabled =
      false;

    submitBtn.textContent =
      'Send Note';

  }

});

