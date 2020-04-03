tabControl();

var resizeTimer;
$(window).on('resize', function (e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    tabControl();
  }, 250);
});

function tabControl() {
  var tabs = $('.tabbed-content').find('.tabs');

  function desktopClickHandler() {
    tabs.find('a').on('click', function (event) {
      event.preventDefault();
      var target = $(this).attr('href'),
          tabs = $(this).parents('.tabs'),
          buttons = tabs.find('a'),
          item = tabs.parents('.tabbed-content').find('.item');
      buttons.removeClass('active');
      item.removeClass('active');
      $(this).addClass('active');
      $(target).addClass('active');
    });
  }

  function mobileClickHandler() {
    function makeItemActive() {
      var container = $(this).parents('.tabbed-content'),
          currId = $(this).attr('id'),
          items = container.find('.item');
      container.find('.tabs a').removeClass('active');
      items.removeClass('active');
      $(this).addClass('active');
      container.find('.tabs a[href$="#' + currId + '"]').addClass('active');
      $('html,body').animate({
            scrollTop: $(this).offset().top - 80
          },
          'slow');
    }

    function makeItemInactive(){
      var container = $(this).parents('.tabbed-content');
      $(this).removeClass('active');
      container.find('.tabs a.active').removeClass('active');
    }

    $('.item').on('click', function () {
      if ($(this).hasClass('active')) {
        makeItemInactive.call(this);
      } else {
        makeItemActive.call(this);
      }
    });
  }

  if (tabs.is(':visible')) {
    desktopClickHandler();
  } else {
    mobileClickHandler();
  }
}