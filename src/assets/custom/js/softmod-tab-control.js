tabControl();

var resizeTimer;
$(window).on('resize', function (e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    tabControl();
  }, 100);
});

var activeContent = "";

function tabControl() {
  console.log(activeContent);
  isOnLargeScreen() ? tabControlOnLargeScreen() : tabControlOnSmallScreen();
}

function isOnLargeScreen() {
  return tabs().is(':visible');
}

function tabControlOnLargeScreen() {
  if (activeContent === "") {
    displaySustainableChangeTabContent();
  } else {
    tabs().find('a[href$="' + activeContent + '"]').addClass('active');
    tabs().find(activeContent).addClass('active');
  }
  handleClickOnLargeScreen();
}

function tabControlOnSmallScreen() {
  $('.item').on('click', function () {
    if ($(this).hasClass('active')) {
      makeItemInactive.call(this);
    } else {
      makeItemActive.call(this);
    }
  });
}

function makeItemInactive() {
  var container = $(this).parents('.tabbed-content');
  $(this).removeClass('active');
  container.find('.tabs a.active').removeClass('active');
  activeContent = "";
}

function makeItemActive() {
  var container = $(this).parents('.tabbed-content'),
      currId = $(this).attr('id'),
      items = container.find('.item');
  container.find('.tabs a').removeClass('active');
  items.removeClass('active');
  $(this).addClass('active');
  container.find('.tabs a[href$="#' + currId + '"]').addClass('active');
  activeContent = "#" + $(this).attr('id');

  $('html,body').animate({
        scrollTop: $(this).offset().top - 80
      },
      'slow');
}

function tabs() {
  return $('.tabbed-content').find('.tabs');
}

function handleClickOnLargeScreen() {
  tabs().find('a').on('click', function (event) {
    event.preventDefault();
    var target = $(this).attr('href'),
        tabs = $(this).parents('.tabs'),
        buttons = tabs.find('a'),
        item = tabs.parents('.tabbed-content').find('.item');
    buttons.removeClass('active');
    item.removeClass('active');
    $(this).addClass('active');
    $(target).addClass('active');
    activeContent = target;
  });
}

function displaySustainableChangeTabContent() {
  console.log("diplay suss change!");
  tabs().find('a[href$="#sustainable-change"]').addClass('active');
  $('.tabbed-content').find("#sustainable-change").addClass('active');
  $('html,body').animate({
        scrollTop: $(tabs().find('a[href$="#sustainable-change"]')).offset().top - 80
      },
      'slow');
}