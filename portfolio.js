// =========================================================
// MERCY'S CLASSROOM — Site Script
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // -------------------------------------------------------
  // Google Apps Script
  // -------------------------------------------------------

  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbxafpNf1tUj3c_50qbVqpstgvjFafHBWxvFTWZXHAnATQ8adMNPVIqAqPxuJi3J7NsX/exec';


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


  // =======================================================
  // CONTACT FORM
  // Google Apps Script → Email
  // =======================================================

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


  var nameInput =
    document.getElementById(
      'name'
    );


  var emailInput =
    document.getElementById(
      'email'
    );


  var messageInput =
    document.getElementById(
      'message'
    );


  if (
    form &&
    sentMsg &&
    submitBtn &&
    nameInput &&
    emailInput &&
    messageInput
  ) {


    // -----------------------------------------------------
    // Format name when the user leaves the name field
    // -----------------------------------------------------

    nameInput.addEventListener(
      'blur',
      function () {

        nameInput.value =
          formatFullName(
            nameInput.value
          );

      }
    );


    // -----------------------------------------------------
    // Submit form
    // -----------------------------------------------------

    form.addEventListener(
      'submit',
      async function (event) {

        event.preventDefault();


        // Prevent double submissions.
        if (submitBtn.disabled) {
          return;
        }


        // Hide previous status message.
        sentMsg.hidden = true;


        // -------------------------------------------------
        // Get and clean form values
        // -------------------------------------------------

        var name =
          formatFullName(
            nameInput.value
          );


        var email =
          emailInput.value
            .trim()
            .toLowerCase();


        var message =
          messageInput.value
            .trim();


        // -------------------------------------------------
        // Validate name
        //
        // At least TWO names are required.
        // Three or more names are allowed.
        // -------------------------------------------------

        var nameParts =
          name
            .split(/\s+/)
            .filter(Boolean);


        if (nameParts.length < 2) {

          showMessage(
            'Please enter at least your first and last name.',
            false
          );

          nameInput.focus();

          return;

        }


        // -------------------------------------------------
        // Validate email
        // -------------------------------------------------

        var emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

          showMessage(
            'Please enter a valid email address.',
            false
          );

          emailInput.focus();

          return;

        }


        // -------------------------------------------------
        // Validate message
        // -------------------------------------------------

        if (!message) {

          showMessage(
            'Please enter your message.',
            false
          );

          messageInput.focus();

          return;

        }


        // -------------------------------------------------
        // Prepare clean payload
        // -------------------------------------------------

        var payload = {

          name: name,

          email: email,

          message: message

        };


        // -------------------------------------------------
        // Show sending state
        // -------------------------------------------------

        submitBtn.disabled = true;

        submitBtn.textContent =
          'Sending...';


        try {

          // -----------------------------------------------
          // Send to Google Apps Script
          // -----------------------------------------------

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


          // -----------------------------------------------
          // Read server response
          // -----------------------------------------------

          var result =
            await response.json();


          // -----------------------------------------------
          // Check server response
          // -----------------------------------------------

          if (!result.success) {

            throw new Error(
              result.error ||
              'Unable to send your message.'
            );

          }


          // -----------------------------------------------
          // SUCCESS
          // -----------------------------------------------

          showMessage(
            'Thanks! Your note has been sent successfully. 💌',
            true
          );


          // Reset only after successful submission.
          form.reset();


        } catch (error) {

          console.error(
            'Contact form error:',
            error
          );


          // ---------------------------------------------
          // ERROR
          // ---------------------------------------------

          showMessage(
            'Sorry, your message could not be sent. Please try again.',
            false
          );

        } finally {

          // ---------------------------------------------
          // Restore button
          // ---------------------------------------------

          submitBtn.disabled = false;

          submitBtn.textContent =
            'Send Note';

        }

      }
    );

  }


  // =======================================================
  // CONTACT FORM HELPER FUNCTIONS
  // =======================================================

  /**
   * Clean and format a full name.
   *
   * Examples:
   *
   * "john doe"
   * → "John Doe"
   *
   * "JOHN MICHAEL DOE"
   * → "John Michael Doe"
   *
   * " john   doe "
   * → "John Doe"
   */
  function formatFullName(value) {

    return value
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(function (part) {

        if (!part) {
          return '';
        }

        return (
          part.charAt(0).toUpperCase() +
          part.slice(1).toLowerCase()
        );

      })
      .filter(Boolean)
      .join(' ');

  }


  /**
   * Display success or error message.
   */
  function showMessage(message, success) {

    sentMsg.textContent =
      message;


    sentMsg.hidden = false;


    if (success) {

      sentMsg.style.color =
        'var(--pencil)';

    } else {

      sentMsg.style.color =
        'var(--coral)';

    }

  }

});