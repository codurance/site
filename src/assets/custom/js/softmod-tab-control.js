tabControl();

var resizeTimer;
$(window).on("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    tabControl();
  }, 100);
});

function tabControl() {
  isOnLargeScreen() ? tabControlOnLargeScreen() : tabControlOnSmallScreen();
}

function isOnLargeScreen() {
  return tabs().is(":visible");
}

var activeContent = "";

function tabControlOnLargeScreen() {
  if (activeContent === "") {
    displaySustainableChangeTabContent();
  } else {
    tabs()
      .find('a[href$="' + activeContent + '"]')
      .addClass("active");
    tabs().find(activeContent).addClass("active");
  }
  handleClickOnLargeScreen();
}

function tabControlOnSmallScreen() {
  $(".item").on("click", function () {
    if ($(this).hasClass("active")) {
      makeItemInactive.call(this);
    } else {
      makeItemActive.call(this);
    }
  });
}

function makeItemInactive() {
  var container = $(this).parents(".tabbed-content");
  $(this).removeClass("active");
  container.find(".tabs a.active").removeClass("active");
  activeContent = "";
}

function makeItemActive() {
  var container = $(this).parents(".tabbed-content"),
    currId = $(this).attr("id"),
    items = container.find(".item");
  container.find(".tabs a").removeClass("active");
  items.removeClass("active");
  $(this).addClass("active");
  container.find('.tabs a[href$="#' + currId + '"]').addClass("active");
  activeContent = "#" + $(this).attr("id");
  scrollToNode(this);
}

function tabs() {
  return $(".tabbed-content").find(".tabs");
}

function handleClickOnLargeScreen() {
  tabs()
    .find("a")
    .on("click", function (event) {
      event.preventDefault();
      var target = $(this).attr("href"),
        tabs = $(this).parents(".tabs"),
        buttons = tabs.find("a"),
        item = tabs.parents(".tabbed-content").find(".item");
      buttons.removeClass("active");
      item.removeClass("active");
      $(this).addClass("active");
      $(target).addClass("active");
      activeContent = target;
    });
}

function displaySustainableChangeTabContent() {
  tabs().find('a[href$="#sustainable-change"]').addClass("active");
  $(".tabbed-content").find("#sustainable-change").addClass("active");
}

function scrollToNode(node) {
  function getTotalOffset(node, total) {
    total = total ? total + node.offsetTop : node.offsetTop;
    if (node.offsetParent && node.offsetParent.offsetTop) {
      return getTotalOffset(node.offsetParent, total);
    }
    return total;
  }

  var totalOffset = getTotalOffset(node);
  var SPACING = 6;
  var header = document.querySelector("header");
  var headerHeight = header ? header.clientHeight : 74;
  var yPosition = totalOffset - SPACING - headerHeight;
  window.scrollTo({ top: yPosition, behaviour: "smooth" });
}
