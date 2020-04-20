(function () {
  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  var TABBER = window.document.querySelector(".tabbed-content");
  var TABS_WRAPPER = TABBER.querySelector(".tabs");
  var TABS = nodeListToArray(TABS_WRAPPER.querySelectorAll("a"));
  var ITEMS = nodeListToArray(TABBER.querySelectorAll(".item"));

  function isLargeScreen() {
    var largeScreenTabsAreVisible = TABS_WRAPPER.scrollHeight > 0;
    return largeScreenTabsAreVisible;
  }

  setUpClickHandlers();
  setUpResizeListener();

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
    makeTabActive(this.hash);
  }

  function makeTabActive(tabHash) {
    var currentTab = TABS_WRAPPER.querySelector("a.active");
    var currentItem = TABBER.querySelector(".item.active");

    currentTab && currentTab.classList.remove("active");
    currentItem && currentItem.classList.remove("active");

    var newTab = TABS_WRAPPER.querySelector("[href='" + tabHash + "']");
    var newItem = TABBER.querySelector(tabHash);

    newTab && newTab.classList.add("active");
    newItem && newItem.classList.add("active");
  }

  function handleItemClick() {
    if (isLargeScreen()) {
      return;
    }

    var item = this;

    item.classList.contains("active")
      ? makeItemInactive(item)
      : makeItemActive(item);
  }

  function makeItemInactive(item) {
    const relatedTab = TABS_WRAPPER.querySelector("a.active");
    item.classList.remove("active");
    relatedTab && relatedTab.classList.remove("active");
  }

  function makeItemActive(item) {
    const tabHash = "#" + item.id;
    makeTabActive(tabHash);
    scrollToNode(item);
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
    var ID = "#sustainable-change";
    var sustainableChangeTab = TABBER.querySelector('a[href="' + ID + '"]');
    var sustainableChangeItem = TABBER.querySelector(ID);

    sustainableChangeTab.classList.add("active");
    sustainableChangeItem.classList.add("active");
  }
})();
