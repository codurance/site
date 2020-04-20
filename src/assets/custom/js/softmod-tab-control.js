(function () {
  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }
  var TABBER = window.document.querySelector(".tabbed-content");
  var TABS_WRAPPER = TABBER.querySelector(".tabs");
  var TABS = nodeListToArray(TABS_WRAPPER.querySelectorAll("a"));
  var ITEMS = nodeListToArray(TABBER.querySelectorAll(".item"));

  setUpClickHandlers();
  setUpResizeListener();

  function isLargeScreen() {
    var largeScreenTabsAreVisible = TABS_WRAPPER.scrollHeight > 0;
    return largeScreenTabsAreVisible;
  }

  function setUpClickHandlers() {
    ITEMS.forEach(function (item) {
      item.onclick = handleItemClick;
    });

    TABS.forEach(function (tab) {
      tab.onclick = handleTabClick;
    });
  }

  function handleTabClick(event) {
    event.preventDefault();

    var target = $(this).attr("href");
    var tabs = $(this).parents(".tabs");
    var buttons = tabs.find("a");
    var item = tabs.parents(".tabbed-content").find(".item");

    buttons.removeClass("active");
    item.removeClass("active");
    $(this).addClass("active");
    $(target).addClass("active");
  }

  function handleItemClick() {
    if (isLargeScreen()) {
      return;
    }

    if ($(this).hasClass("active")) {
      makeItemInactive.call(this);
      return;
    }
    makeItemActive.call(this);
  }

  function makeItemInactive() {
    var container = $(this).parents(".tabbed-content");
    $(this).removeClass("active");
    container.find(".tabs a.active").removeClass("active");
  }

  function makeItemActive() {
    var container = $(this).parents(".tabbed-content"),
      currId = $(this).attr("id"),
      items = container.find(".item");
    container.find(".tabs a").removeClass("active");
    items.removeClass("active");
    $(this).addClass("active");
    container.find('.tabs a[href$="#' + currId + '"]').addClass("active");
    scrollToNode(this);
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

  function setUpResizeListener() {
    var resizeTimer;
    $(window).on("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        handleResize();
      }, 100);
    });
  }

  var currentLayout = isLargeScreen() ? "large" : "small";

  function handleResize() {
    var newLayout = isLargeScreen() ? "large" : "small";
    if (newLayout === currentLayout) {
      return;
    }

    currentLayout = newLayout;

    var noActiveTabs = document.querySelector(".tabs .active") === null;

    if (newLayout === "large" && noActiveTabs) {
      displaySustainableChangeTabContent();
    }
  }

  function displaySustainableChangeTabContent() {
    $(".tabbed-content")
      .find(".tabs")
      .find('a[href$="#sustainable-change"]')
      .addClass("active");
    $(".tabbed-content").find("#sustainable-change").addClass("active");
  }
})();
