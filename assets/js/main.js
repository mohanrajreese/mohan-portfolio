!(function($) {
  "use strict";

  // Handling themes
  if(localStorage.getItem('theme')===null) {
    localStorage.setItem('theme', 'light');
    enableDarkThemeMenu();
  }
  else {
    getAndSetTheme();
  }
  
  $('.theme-toggler').on('click', function() {
    toggleTheme();
  });

  function getAndSetTheme() {
    if(localStorage.getItem('theme')=='light') {
      enableDarkThemeMenu();
    }
    else {
      enableLightThemeMenu();
      enableTheme();
    }
  }

  function toggleTheme() {
    if(localStorage.getItem('theme')=='light') {
      localStorage.setItem('theme', 'dark');
      enableLightThemeMenu();
      enableTheme();
    }
    else {
      localStorage.setItem('theme', 'light');
      enableDarkThemeMenu();
      enableTheme();
    }
  }

  function enableDarkThemeMenu() {
    $('.light-theme').css('display','none');
    $('.dark-theme').css('display','block');
  }

  function enableLightThemeMenu() {
    $('.light-theme').css('display','block');
    $('.dark-theme').css('display','none');
  }

  function enableTheme() {
    $('body').toggleClass('body-dark-theme', 1000);
    $('#portfolio').toggleClass('section-bg', 1000);
    $('.section-title').toggleClass('dark-theme-section', 1000);
    $('.about .content').toggleClass('dark-theme-about', 1000);
    $('.projects').toggleClass('dark-theme-project', 1000);
    $('.portfolio').toggleClass('dark-theme-portfolio', 1000);
    $('.resume').toggleClass('dark-theme-resume', 1000);
    $('.contact').toggleClass('dark-theme-contact', 1000);
  }

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    $('li[data-filter=".filter-award"]').click();

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  $("#sendMessage").on("click", function() {
      var name = $("#name").val();
      var email = $("#email").val();
      var subject = $("#subject").val();
      var message_area = $("#message-area").val();
      if(!name || !email || !subject || !message_area) {
        alert('One or more invalid fields found! Please enter all the field and submit.');
        return false;
      }
      else if(!isEmail(email)) {
        alert('Invalid email format');
      }
      else {
        $.ajax({
          url: "https://formspree.io/f/mgepdnbo", 
          method: "POST",
          data: {
            name: name,
            email: email,
            subject: subject,
            message: message_area
          },
          dataType: "json"
      });
      alert('Details submitted successfully!');
      return false;
      }
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);