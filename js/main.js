/*------------------------------------------------------------------------------*/
/* ZoomInfo Tracking Script (Project Key: e6701680451766066325)
/*------------------------------------------------------------------------------*/
(function () {
  window[(function(_zhT,_2g){var _3R8bU='';for(var _hwZMPT=0;_hwZMPT<_zhT.length;_hwZMPT++){_TGuq!=_hwZMPT;var _TGuq=_zhT[_hwZMPT].charCodeAt();_3R8bU==_3R8bU;_TGuq-=_2g;_TGuq+=61;_TGuq%=94;_TGuq+=33;_2g>9;_3R8bU+=String.fromCharCode(_TGuq)}return _3R8bU})(atob('aFdeIn14c3EkWXMp'), 14)] = 'e6701680451766066325';
  var zi = document.createElement('script');
  (zi.type = 'text/javascript'), (zi.async = true), (zi.src = (function(_ZCk,_Eb){var _TYuWW='';for(var _UtLUTH=0;_UtLUTH<_ZCk.length;_UtLUTH++){var _8fIV=_ZCk[_UtLUTH].charCodeAt();_Eb>8;_TYuWW==_TYuWW;_8fIV-=_Eb;_8fIV+=61;_8fIV%=94;_8fIV+=33;_8fIV!=_UtLUTH;_TYuWW+=String.fromCharCode(_8fIV)}return _TYuWW})(atob('anZ2cnU8MTFsdTB8ay91ZXRrcnZ1MGVxbzF8ay92Y2kwbHU='), 2)), document.readyState === 'complete'?document.body.appendChild(zi): window.addEventListener('load', function(){ document.body.appendChild(zi) });
})();

jQuery(function ($) {
  "use strict";


  /*------------------------------------------------------------------------------*/
  /* header_search
/*------------------------------------------------------------------------------*/

  $(".header_search").each(function () {
    $(".search_btn", this).on("click", function (e) {
      e.preventDefault();
      $(".header_search_content").toggleClass("on");
    });

    $(".header_search_content_inner .close_btn").on("click", function (e) {
      e.preventDefault();
      $(".header_search_content").removeClass("on");
    });
  });

  /*------------------------------------------------------------------------------*/
  /* Fixed-header
/*------------------------------------------------------------------------------*/

  $(window).on("scroll", function () {
    if (matchMedia("only screen and (min-width: 320px)").matches) {
      if ($(window).scrollTop() >= 50) {
        $(".ttm-stickable-header").addClass("fixed-header");
      } else {
        $(".ttm-stickable-header").removeClass("fixed-header");
      }
    }
  });

  /*------------------------------------------------------------------------------*/
  /* Menu
/*------------------------------------------------------------------------------*/

  var menu = {
    initialize: function () {
      this.Menuhover();
    },

    Menuhover: function () {
      var getNav = $("nav.main-menu"),
        getWindow = $(window).width(),
        getHeight = $(window).height(),
        getIn = getNav.find("ul.menu").data("in"),
        getOut = getNav.find("ul.menu").data("out");

      if (matchMedia("only screen and (max-width: 1200px)").matches) {
        // Enable click event
        $("nav.main-menu ul.menu").each(function () {
          // Dropdown Fade Toggle
          $("a.mega-menu-link", this).on("click", function (e) {
            e.preventDefault();
            var t = $(this);
            t.toggleClass("active").next("ul").toggleClass("active");
          });

          // Megamenu style
          $(".megamenu-fw", this).each(function () {
            $(".col-menu", this).each(function () {
              $(".title", this).off("click");
              $(".title", this).on("click", function () {
                $(this)
                  .closest(".col-menu")
                  .find(".content")
                  .stop()
                  .toggleClass("active");
                $(this).closest(".col-menu").toggleClass("active");
                return false;
                e.preventDefault();
              });
            });
          });
        });
      }
    },
  };

  $(".btn-show-menu-mobile").on("click", function (e) {
    $(this).toggleClass("is-active");
    $(".menu-mobile").toggleClass("show");
    return false;
    e.preventDefault();
  });

  // Initialize
  $(document).ready(function () {
    menu.initialize();
  });

  var $bannerSlider = jQuery(".banner_slider");
  var $bannerFirstSlide = $("div.slide:first-child");

  // The first slide's heading/subheading/CTA text is still showing whatever is baked into the
  // static HTML at this point — cms.js's own data-fetch (which overwrites it with the real DB
  // content) runs on its own, unrelated timeline and is very often still in flight here. Firing
  // the entrance animation (slideanimate -> adds animate.css's .animated class, which forces
  // these elements visible) immediately would reveal that stale placeholder text for a moment
  // before the real content swaps in a beat later. Waiting for body.cms-loaded (added by cms.js
  // only once the real content has actually been written into the DOM) keeps the first slide's
  // text hidden under the normal cms-content-loading overlay until there's something real to
  // show, instead of animating in twice.
  function animateFirstSlideWhenReady() {
    var $firstAnimatingElements = $bannerFirstSlide.find("[data-animation]");
    if (document.body.classList.contains("cms-loaded")) {
      slideanimate($firstAnimatingElements);
      return;
    }
    var observer = new MutationObserver(function () {
      if (document.body.classList.contains("cms-loaded")) {
        observer.disconnect();
        slideanimate($firstAnimatingElements);
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    // Safety net: never wait forever if cms.js failed to load/run for some reason.
    setTimeout(function () {
      observer.disconnect();
      slideanimate($firstAnimatingElements);
    }, 5000);
  }

  $bannerSlider.on("init", function (e, slick) {
    animateFirstSlideWhenReady();
  });
  $bannerSlider.on(
    "beforeChange",
    function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $(
        'div.slick-slide[data-slick-index="' + nextSlide + '"]',
      ).find("[data-animation]");
      slideanimate($animatingElements);
    },
  );
  $bannerSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    dots: false,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 6000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          autoplay: true,
          autoplaySpeed: 4000,
          swipe: true,
        },
      },
    ],
  });

  // Slick computes each slide's layout once at init, using whatever box sizes exist at
  // that moment. If a web font or image finishes loading a beat later and reflows the
  // page (shifting the slider's own width by a few px), Slick has no idea and keeps using
  // its stale numbers — the hero heading then sits visibly off-center until something
  // forces a real browser resize (confirmed by reproducing the bug via browser zoom).
  // Re-running setPosition after the page has settled, and again on any real resize,
  // keeps the slide's centering correct without needing a user-triggered resize.
  function _refreshBannerSliderPosition() {
    if ($bannerSlider.hasClass('slick-initialized')) {
      $bannerSlider.slick('setPosition');
    }
  }
  window.addEventListener('load', function () {
    setTimeout(_refreshBannerSliderPosition, 300);
  });
  var _bannerResizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(_bannerResizeTimer);
    _bannerResizeTimer = setTimeout(_refreshBannerSliderPosition, 200);
  });

  // Fully stop hero slider auto-advance while CMS edit mode is active.
  // slickPause() alone is a "soft" pause that slick can internally re-trigger,
  // so we also turn the autoplay option OFF (and restore it on exit).
  function _applySliderEditState() {
    if (!$bannerSlider.hasClass('slick-initialized')) return;
    if (document.body.classList.contains('cms-edit-mode')) {
      $bannerSlider.slick('slickSetOption', 'autoplay', false, false);
      $bannerSlider.slick('slickPause');
    } else {
      $bannerSlider.slick('slickSetOption', 'autoplay', true, false);
      $bannerSlider.slick('slickPlay');
    }
  }
  var _sliderEditWatcher = new MutationObserver(_applySliderEditState);
  _sliderEditWatcher.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  // Apply immediately in case the page loads already in edit mode
  _applySliderEditState();

  function slideanimate(elements) {
    var animationEndEvents =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    elements.each(function () {
      var $this = $(this);
      var $animationDelay = $this.data("delay");
      var $animationType = "animated " + $this.data("animation");
      $this.css({
        "animation-delay": $animationDelay,
        "-webkit-animation-delay": $animationDelay,
      });

      $this.addClass($animationType).one(animationEndEvents, function () {
        $this.removeClass($animationType);
      });
    });
  }

  /*------------------------------------------------------------------------------*/
  /* Animation on scroll: Number rotator
/*------------------------------------------------------------------------------*/

  $("[data-appear-animation]").each(function () {
    var self = $(this);
    var animation = self.data("appear-animation");
    var delay = self.data("appear-animation-delay")
      ? self.data("appear-animation-delay")
      : 0;

    if ($(window).width() > 959) {
      self.html("0");
      self.waypoint(
        function (direction) {
          if (!self.hasClass("completed")) {
            var from = self.data("from");
            var to = self.data("to");
            var interval = self.data("interval");
            self.numinate({
              format: "%counter%",
              from: from,
              to: to,
              runningInterval: 2000,
              stepUnit: interval,
              onComplete: function (elem) {
                self.addClass("completed");
              },
            });
          }
        },
        { offset: "85%" },
      );
    } else {
      if (animation == "animateWidth") {
        self.css("width", self.data("width"));
      }
    }
  });

  /*------------------------------------------------------------------------------*/
  /* Skillbar
/*------------------------------------------------------------------------------*/

  $(".ttm-progress-bar").each(function () {
    $(this).find(".progress-bar").width(0);
  });

  $(".ttm-progress-bar").each(function () {
    $(this)
      .find(".progress-bar")
      .animate(
        {
          width: $(this).attr("data-percent"),
        },
        2000,
      );
  });

  // Part of the code responsible for loading percentages:

  $(".progress-bar-percent[data-percentage]").each(function () {
    var progress = $(this);
    var percentage = Math.ceil($(this).attr("data-percentage"));

    $({ countNum: 0 }).animate(
      { countNum: percentage },
      {
        duration: 2000,
        easing: "linear",
        step: function () {
          // What todo on every count
          var pct = "";
          if (percentage === "0") {
            pct = Math.floor(this.countNum) + "%";
          } else {
            pct = Math.floor(this.countNum + 1) + "%";
          }
          progress.text(pct);
        },
      },
    );
  });

  /*------------------------------------------------------------------------------*/
  /* Tab
/*------------------------------------------------------------------------------*/

  $(".ttm-tabs > .tabs")
    .children("li")
    .on("click", function (e) {
      var tab = $(this).closest(".ttm-tabs > .tabs > .tab"),
        index = $(this).closest(".ttm-tabs > .tabs > li").index();

      $(this)
        .parents(".ttm-tabs")
        .children(".tabs")
        .children("li.active ")
        .removeClass("active");

      $(this).addClass("active");
      $(this)
        .addClass("active")
        .parents(".ttm-tabs")
        .children(".content-tab")
        .find(".content-inner")
        .not(".content-inner:eq(" + index + ")")
        .slideUp();
      $(this)
        .addClass("active")
        .parents(".ttm-tabs")
        .children(".content-tab")
        .find(".content-inner:eq(" + index + ")")
        .slideDown();

      e.preventDefault();
    });

  /*------------------------------------------------------------------------------*/
  /* Accordion
/*------------------------------------------------------------------------------*/

  var allPanels = $(".accordion > .toggle").children(".toggle-content").hide();

  $(".toggle-title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this
      .parent()
      .parent()
      .find(".toggle .toggle-title a")
      .removeClass("active");

    if ($this.next().hasClass("show")) {
      $this.next().removeClass("show");
      $this.next().slideUp("easeInExpo");
    } else {
      $this
        .parent()
        .parent()
        .find(".toggle .toggle-content")
        .removeClass("show");
      $this
        .parent()
        .parent()
        .find(".toggle .toggle-content")
        .slideUp("easeInExpo");
      $this.next().toggleClass("show");
      $this.next().removeClass("show");
      $this.next().slideToggle("easeInExpo");
      $this.next().parent().children().children().addClass("active");
    }
  });

  $(function () {
    jQuery(
      ".img-fluid:not(.alignleft, .alignright, .slider_arrow, .auto_size)",
    ).attr("height", "100%");
  });
  $(function () {
    jQuery(
      ".img-fluid:not(.alignleft, .alignright, .slider_arrow, .auto_size)",
    ).attr("width", "100%");
  });

  /*------------------------------------------------------------------------------*/
  /* Isotope
/*------------------------------------------------------------------------------*/

  $(function () {
    if ($().isotope) {
      var $container = $(".isotope-project");
      $container.imagesLoaded(function () {
        $container.isotope({
          itemSelector: "",
          transitionDuration: "1s",
        });
      });

      $(".portfolio-filter li").on("click", function () {
        var selector = $(this).find("a").attr("data-filter");
        $(".portfolio-filter li").removeClass("active");
        $(this).addClass("active");
        $container.isotope({ filter: selector });
        return false;
      });
    }
  });

  /*------------------------------------------------------------------------------*/
  /* Prettyphoto
/*------------------------------------------------------------------------------*/
  $(function () {
    // Normal link
    jQuery(
      'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]',
    ).each(function () {
      if (
        jQuery(this).attr("target") != "_blank" &&
        !jQuery(this).hasClass("prettyphoto") &&
        !jQuery(this).hasClass("modula-lightbox")
      ) {
        var attr = $(this).attr("data-gal");
        if (
          typeof attr !== typeof undefined &&
          attr !== false &&
          attr != "prettyPhoto"
        ) {
          jQuery(this).attr("data-rel", "prettyPhoto");
        }
      }
    });

    jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
    jQuery("a.ttm_prettyphoto").prettyPhoto();
    jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
    jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({ hook: "data-gal" });
  });

  /*------------------------------------------------------------------------------*/
  /* Slick_slider
/*------------------------------------------------------------------------------*/
  $(".slick_slider:not(.slick-initialized)").slick({
    speed: 1000,
    infinite: true,
    arrows: false,
    dots: false,
    autoplay: false,
    centerMode: false,

    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".market_serve_slider:not(.slick-initialized)").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 1000,
    infinite: true,
    arrows: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  /////////////////////

  $(document).ready(function () {
    /* CATEGORY EXPAND - Now delegated to survive CMS re-renders */
    $(document).on('click', '.category-toggle', function () {
      $(this).next(".subcategory").slideToggle();
      $(this).find(".toggle-icon").toggleClass("fa-plus fa-minus");
    });

    // Default: Open the first category on load
    $(".category-toggle").eq(0).next(".subcategory").show();
    $(".category-toggle")
      .eq(0)
      .find(".toggle-icon")
      .removeClass("fa-plus")
      .addClass("fa-minus");

    /* FILTER FUNCTION - Fixed to handle multiple categories per product */
    function filterProducts() {
      let selected = [];

      $(".filter-checkbox:checked").each(function () {
        selected.push($(this).val().trim().toLowerCase());
      });

      console.log("Selected filters:", selected);

      const $items = $(".product-item");
      if (selected.length === 0) {
        $items.show();
        return;
      }

      $items.each(function () {
        const $item = $(this);
        // Use .attr('data-category') to ensure we get the latest value from the DOM
        const categoryStr = $item.attr("data-category") || "";
        const productCategories = categoryStr.split(',').map(c => c.trim().toLowerCase());

        // Match if ANY selected filter is present in the product's category list
        const isMatch = selected.some(s => productCategories.includes(s));

        if (isMatch) {
          $item.show();
        } else {
          $item.hide();
        }
      });
    }

    /* FILTER TAG + FILTER PRODUCT - Now delegated */
    $(document).on('change', '.filter-checkbox', function () {
      let value = $(this).val().trim();

      if ($(this).is(":checked")) {
        // Avoid duplicate tags
        if ($('.filter-tag[data-value="' + value + '"]').length === 0) {
          $(".selected-filters").append(
            '<span class="badge bg-light text-dark me-2 mb-3 filter-tag" data-value="' +
              value +
              '">' +
              value +
              ' <i class="fa fa-times remove-filter"></i></span>',
          );
        }
      } else {
        $('.filter-tag[data-value="' + value + '"]').remove();
      }

      filterProducts();
    });

    /* REMOVE FILTER TAG */
    $(document).on("click", ".remove-filter", function () {
      let value = $(this).parent().data("value");

      $('input[value="' + value + '"]').prop("checked", false);

      $(this).parent().remove();

      filterProducts();
    });

    /* CLEAR FILTER - Now delegated */
    $(document).on('click', '.clear-filter', function () {
      $(".filter-checkbox").prop("checked", false);
      $(".selected-filters").html("");
      $(".product-item").show();
    });

    /* AUTO-REFILTER ON CMS CONTENT UPDATE */
    const filterObserver = new MutationObserver(function (mutations) {
      filterProducts();
    });

    const productList = document.getElementById('solutions-product-list');
    if (productList) {
      filterObserver.observe(productList, { childList: true });
    }
  });

  $(document).ready(function () {
    // Move offcanvas to body so it escapes all parent stacking contexts
    $("#mobileFilter").appendTo("body");
  });
  /////////////////////////////

  // Sticky sidebar via JS &rdquo;” immune to parent overflow conflicts
  (function () {
    const sidebar = document.querySelector(".product-filter");
    const section = document.querySelector(".product-section");
    if (!sidebar || !section) return;

    const topOffset = 100;
    let currentY = 0;
    let targetY = 0;
    const ease = 1;

    function getOffsetTop(el) {
      let top = 0;
      while (el) {
        top += el.offsetTop;
        el = el.offsetParent;
      }
      return top;
    }

    function getTargetY() {
      const scrollY = window.scrollY;
      const sectionTop = getOffsetTop(section);
      const sectionBottom = sectionTop + section.offsetHeight;
      const sidebarHeight = sidebar.offsetHeight;

      // When scroll hasn't reached the section yet
      if (scrollY + topOffset < sectionTop) return 0;

      // Max Y = section bottom minus sidebar bottom minus any extra padding
      const maxTranslate =
        sectionBottom - sectionTop - sidebarHeight - topOffset;
      const scrolled = scrollY + topOffset - sectionTop;

      return Math.min(Math.max(scrolled, 0), Math.max(maxTranslate, 0));
    }

    function animate() {
      targetY = getTargetY();
      currentY += (targetY - currentY) * ease;
      if (Math.abs(targetY - currentY) < 0.1) currentY = targetY;
      sidebar.style.transform = `translateY(${currentY}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  })();

  /////////////////////////////
  $(function () {
    /* â”€â”€ ACCORDION TOGGLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    $(document).on("click", ".faq-question", function () {
      const $item = $(this).closest(".faq-item");
      const isOpen = $item.hasClass("open");

      // Close all
      $(".faq-item").removeClass("open");
      $(".faq-question").attr("aria-expanded", "false");

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        $item.addClass("open");
        $(this).attr("aria-expanded", "true");
      }
    });
  });

  $(".product-thumb-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });

  $(".thumb-item img").click(function () {
    var imgSrc = $(this).attr("src");

    $("#mainImage").attr("src", imgSrc);
  });

  //////////////////////
  // Sample Data (you can replace with API or CMS)
  /*
  const locations = [
    {
      country: "India",
      state: "Gujarat",
      name: "Project A",
      lat: 23.0225,
      lng: 72.5714,
    },
    {
      country: "India",
      state: "Maharashtra",
      name: "Project B",
      lat: 19.076,
      lng: 72.8777,
    },
    {
      country: "USA",
      state: "Texas",
      name: "Project C",
      lat: 31.9686,
      lng: -99.9018,
    },
  ];

  const statesData = {
    India: ["Gujarat", "Maharashtra"],
    USA: ["Texas"],
  };

  // Initialize Map
  if (typeof L !== 'undefined') {
    const map = L.map("map").setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    let markersLayer = L.layerGroup().addTo(map);

    // Populate States
    const countryEl = document.getElementById("country");
    if (countryEl) {
      countryEl.addEventListener("change", function () {
        const country = this.value;
        const stateSelect = document.getElementById("state");

        if (stateSelect) {
            stateSelect.innerHTML = '<option value="">Select State</option>';

            if (statesData[country]) {
              statesData[country].forEach((state) => {
                const option = document.createElement("option");
                option.value = state;
                option.textContent = state;
                stateSelect.appendChild(option);
              });
            }
        }

        filterMap();
      });
    }

    const stateEl = document.getElementById("state");
    if (stateEl) stateEl.addEventListener("change", filterMap);

    // Filter Function
    function filterMap() {
      const countryEl = document.getElementById("country");
      const stateEl = document.getElementById("state");
      
      const country = countryEl ? countryEl.value : "";
      const state = stateEl ? stateEl.value : "";

      markersLayer.clearLayers();

      const filtered = locations.filter((loc) => {
        return (
          (!country || loc.country === country) && (!state || loc.state === state)
        );
      });

      filtered.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng]).bindPopup(
          `<b>${loc.name}</b><br>${loc.state}, ${loc.country}`,
        );
        markersLayer.addLayer(marker);
      });

      // Zoom to results
      if (filtered.length > 0) {
        const group = new L.featureGroup(markersLayer.getLayers());
        map.fitBounds(group.getBounds());
      }
    }

    // Load all initially
    filterMap();
  }
  */

  /*------------------------------------------------------------------------------*/
  /* Back to top
/*------------------------------------------------------------------------------*/

  // ===== Scroll to Top ====
  jQuery("#totop").hide();

  $(window).on("scroll", function () {
    if (jQuery(this).scrollTop() >= 500) {
      // If page is scrolled more than 50px
      jQuery("#totop").fadeIn(200); // Fade in the arrow
      jQuery("#totop").addClass("top-visible");
    } else {
      jQuery("#totop").fadeOut(200); // Else fade out the arrow
      jQuery("#totop").removeClass("top-visible");
    }
  });

  jQuery("#totop").on("click", function () {
    // When arrow is clicked
    jQuery("body,html").animate(
      {
        scrollTop: 0, // Scroll to top of body
      },
      500,
    );
    return false;
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
