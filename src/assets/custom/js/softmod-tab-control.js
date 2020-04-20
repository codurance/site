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

    toggleItem(this);
  }

  function toggleItem(item) {
    var itemIsActive = item.classList.contains("active");

    if (itemIsActive) {
      makeItemInactive(item);
    } else {
      makeItemActive(item);
      scrollToItem(item);
    }
  }

  function makeItemInactive(item) {
    item.classList.remove("active");
    const relatedTab = TABS_WRAPPER.querySelector("a.active");
    relatedTab && relatedTab.classList.remove("active");
  }

  function makeItemActive(item) {
    const tabHash = "#" + item.id;
    makeTabActive(tabHash);
  }

  function scrollToItem(item) {
    function getTotalOffset(item, total) {
      total = total ? total + item.offsetTop : item.offsetTop;
      if (item.offsetParent && item.offsetParent.offsetTop) {
        return getTotalOffset(item.offsetParent, total);
      }
      return total;
    }

    var totalOffset = getTotalOffset(item);
    var SPACING = 6;
    var header = document.querySelector("header");
    var headerHeight = header ? header.clientHeight : 74;
    var yPosition = totalOffset - SPACING - headerHeight;
    window.scrollTo({ top: yPosition, behaviour: "smooth" });
  }

  function setUpResizeListener() {
    var resizeTimer;
    window.onresize = function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };
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
