/*! =========================================================
 *
 * Material Kit PRO - V1.1.0
 *
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-kit-pro
 * Available with purchase of license from http://www.creative-tim.com/product/material-kit-pro
 * Copyright 2017 Creative Tim (https://www.creative-tim.com)
 * License Creative Tim (https://www.creative-tim.com/license)
 *
 * ========================================================= */
var big_image;
$(document).on('turbolinks:load', function() {
  $.material.init();
  window_width = $(window).width();
  $navbar = $('.navbar[color-on-scroll]');
  scroll_distance = $navbar.attr('color-on-scroll') || 500;
  $navbar_collapse = $('.navbar').find('.navbar-collapse');
  $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  if ($(".selectpicker").length != 0) {
    $(".selectpicker").selectpicker()
  }
  $('[data-toggle="popover"]').popover();
  $('.carousel').carousel({
    interval: 3000
  });
  var tagClass = $('.tagsinput').data('color');
  $('.tagsinput').tagsinput({
    tagClass: ' tag-' + tagClass + ' '
  });
  if ($('.navbar-color-on-scroll').length != 0) {
    $(window).on('scroll', materialKit.checkScrollForTransparentNavbar)
  }
  if (window_width >= 768) {
    big_image = $('.page-header[data-parallax="true"]');
    if (big_image.length != 0) {
      $(window).on('scroll', materialKitDemo.checkScrollForParallax)
    }
  }
  materialKit.initRotateCard();
  materialKit.initColoredShadows();
  materialKit.initAtvImg()
});
$(document).on('click', '.card-rotate .btn-rotate', function() {
  var $rotating_card_container = $(this).closest('.rotating-card-container');
  if ($rotating_card_container.hasClass('hover')) {
    $rotating_card_container.removeClass('hover')
  } else {
    $rotating_card_container.addClass('hover')
  }
});
$(document).on('click', '.navbar-toggle', function() {
  $toggle = $(this);
  if (materialKit.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    materialKit.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled')
    }, 550);
    $('html').removeClass('nav-open-absolute')
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled')
    }, 580);
    div = '<div id="bodyClick"></div>';
    $(div).appendTo("body").click(function() {
      $('html').removeClass('nav-open');
      if ($('nav').hasClass('navbar-absolute')) {
        $('html').removeClass('nav-open-absolute')
      }
      materialKit.misc.navbar_menu_visible = 0;
      $('#bodyClick').remove();
      setTimeout(function() {
        $toggle.removeClass('toggled')
      }, 550)
    });
    if ($('nav').hasClass('navbar-absolute')) {
      $('html').addClass('nav-open-absolute')
    }
    $('html').addClass('nav-open');
    materialKit.misc.navbar_menu_visible = 1
  }
});
$(window).on('resize', function() {
  materialKit.initRotateCard()
});
materialKit = {
  misc: {
    navbar_menu_visible: 0,
    window_width: 0,
    transparent: !0,
    colored_shadows: !0,
    fixedTop: !1,
    navbar_initialized: !1,
    isWindow: document.documentMode || /Edge/.test(navigator.userAgent)
  },
  initAtvImg: function() {
    $('.card-atv').each(function() {
      var $atv_div = $(this).find('.atvImg');
      var $atv_img = $atv_div.find('img');
      var img_src = $atv_img.attr('src');
      var atv_image_layer = '<div class="atvImg-layer" data-img="' + img_src + '"/>';
      $atv_div.css('height', $atv_img.height() + 'px');
      $atv_div.append(atv_image_layer)
    });
    atvImg()
  },
  initColoredShadows: function() {
    if (materialKit.misc.colored_shadows == !0) {
      if (!materialKit.misc.isWindows) {
        $('.card:not([data-colored-shadow="false"]) .card-image').each(function() {
          var $card_img = $(this);
          is_on_dark_screen = $(this).closest('.section-dark, .section-image').length;
          if (is_on_dark_screen == 0) {
            var img_source = $card_img.find('img').attr('src');
            var is_rotating = $card_img.closest('.card-rotate').length == 1 ? !0 : !1;
            var $append_div = $card_img;
            var colored_shadow_div = $('<div class="colored-shadow"/>');
            if (is_rotating) {
              var card_image_height = $card_img.height();
              var card_image_width = $card_img.width();
              $(this).find('.back').css({
                'height': card_image_height + 'px',
                'width': card_image_width + 'px'
              });
              var $append_div = $card_img.find('.front')
            }
            colored_shadow_div.css({
              'background-image': 'url(' + img_source + ')'
            }).appendTo($append_div);
            if ($card_img.width() > 700) {
              colored_shadow_div.addClass('colored-shadow-big')
            }
            setTimeout(function() {
              colored_shadow_div.css('opacity', 1)
            }, 200)
          }
        })
      }
    }
  },
  initRotateCard: debounce(function() {
    $('.card-rotate .card-image > .back').each(function() {
      var card_image_height = $(this).parent().height();
      var card_image_width = $(this).parent().width();
      $(this).css({
        'height': card_image_height + 'px',
        'width': card_image_width + 'px'
      });
      if ($(this).hasClass('back-background')) {
        var img_src = $(this).siblings('.front').find('img').attr('src');
        $(this).css('background-image', 'url("' + img_src + '")')
      }
    })
  }, 17),
  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > scroll_distance) {
      if (materialKit.misc.transparent) {
        materialKit.misc.transparent = !1;
        $('.navbar-color-on-scroll').removeClass('navbar-transparent')
      }
    } else {
      if (!materialKit.misc.transparent) {
        materialKit.misc.transparent = !0;
        $('.navbar-color-on-scroll').addClass('navbar-transparent')
      }
    }
  }, 17),
  initFormExtendedDatetimepickers: function() {
    $('.datetimepicker').datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove',
        inline: !0
      }
    });
    $('.datepicker').datetimepicker({
      format: 'MM/DD/YYYY',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove',
        inline: !0
      }
    });
    $('.timepicker').datetimepicker({
      format: 'h:mm A',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove',
        inline: !0
      }
    })
  },
  initSliders: function() {
    var slider = document.getElementById('sliderRegular');
    noUiSlider.create(slider, {
      start: 40,
      connect: [!0, !1],
      range: {
        min: 0,
        max: 100
      }
    });
    var slider2 = document.getElementById('sliderDouble');
    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: !0,
      range: {
        min: 0,
        max: 100
      }
    })
  }
}
materialKitDemo = {
  checkScrollForParallax: debounce(function() {
    if (isElementInViewport(big_image)) {
      var current_scroll = $(this).scrollTop();
      oVal = ($(window).scrollTop() / 3);
      big_image.css({
        'transform': 'translate3d(0,' + oVal + 'px,0)',
        '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
        '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
        '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
      })
    }
  }, 4),
  initContactUsMap: function() {
    var myLatlng = new google.maps.LatLng(44.433530, 26.093928);
    var mapOptions = {
      zoom: 14,
      center: myLatlng,
      styles: [{
        "featureType": "water",
        "stylers": [{
          "saturation": 43
        }, {
          "lightness": -11
        }, {
          "hue": "#0088ff"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "hue": "#ff0000"
        }, {
          "saturation": -100
        }, {
          "lightness": 99
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#808080"
        }, {
          "lightness": 54
        }]
      }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ece2d9"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ccdca1"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#767676"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#b8cb93"
        }]
      }, {
        "featureType": "poi.park",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.sports_complex",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.medical",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "simplified"
        }]
      }],
      scrollwheel: !1,
    }
    var map = new google.maps.Map(document.getElementById("contactUsMap"), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });
    marker.setMap(map)
  },
  initContactUs2Map: function() {
    var lat = 44.433530;
    var long = 26.093928;
    var centerLong = long - 0.025;
    var myLatlng = new google.maps.LatLng(lat, long);
    var centerPosition = new google.maps.LatLng(lat, centerLong);
    var mapOptions = {
      zoom: 14,
      center: centerPosition,
      styles: [{
        "featureType": "water",
        "stylers": [{
          "saturation": 43
        }, {
          "lightness": -11
        }, {
          "hue": "#0088ff"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "hue": "#ff0000"
        }, {
          "saturation": -100
        }, {
          "lightness": 99
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#808080"
        }, {
          "lightness": 54
        }]
      }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ece2d9"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ccdca1"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#767676"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#b8cb93"
        }]
      }, {
        "featureType": "poi.park",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.sports_complex",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.medical",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "simplified"
        }]
      }],
      scrollwheel: !1,
    }
    var map = new google.maps.Map(document.getElementById("contactUs2Map"), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });
    marker.setMap(map)
  },
  initSharrre: function() {
    $('#twitter').sharrre({
      share: {
        twitter: !0
      },
      enableHover: !1,
      enableTracking: !0,
      enableCounter: !1,
      buttons: {
        twitter: {
          via: 'CreativeTim'
        }
      },
      click: function(api, options) {
        api.simulateClick();
        api.openPopup('twitter')
      },
      template: '<i class="fa fa-twitter"></i> Twitter',
      url: 'http://demos.creative-tim.com/material-kit-pro/presentation.html'
    });
    $('#facebook').sharrre({
      share: {
        facebook: !0
      },
      enableHover: !1,
      enableTracking: !0,
      enableCounter: !1,
      click: function(api, options) {
        api.simulateClick();
        api.openPopup('facebook')
      },
      template: '<i class="fa fa-facebook-square"></i> Facebook',
      url: 'http://demos.creative-tim.com/material-kit-pro/presentation.html'
    });
    $('#google').sharrre({
      share: {
        googlePlus: !0
      },
      enableCounter: !1,
      enableHover: !1,
      enableTracking: !0,
      click: function(api, options) {
        api.simulateClick();
        api.openPopup('googlePlus')
      },
      template: '<i class="fa fa-google-plus"></i> Google',
      url: 'http://demos.creative-tim.com/material-kit-pro/presentation.html'
    })
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args)
    }, wait);
    if (immediate && !timeout) func.apply(context, args)
  }
};

function isElementInViewport(elem) {
  var $elem = $(elem);
  var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
  var viewportTop = $(scrollElem).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  var elemTop = Math.round($elem.offset().top);
  var elemBottom = elemTop + $elem.height();
  return ((elemTop < viewportBottom) && (elemBottom > viewportTop))
}(function(i, s, o, g, r, a, m) {
  i.GoogleAnalyticsObject = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-46172202-1', 'auto');
ga('send', 'pageview')
