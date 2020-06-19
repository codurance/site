(function () {
  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  var TABBER = window.document.querySelector("[data-tabber]");

  if (TABBER === null) {
    return;
  }

  var TABS_WRAPPER = TABBER.querySelector("[data-tabber_nav]");
  var LARGE_SCREEN_CONTROLS = nodeListToArray(
    TABS_WRAPPER.querySelectorAll("[data-nav_item]")
  );
  var PANEL = nodeListToArray(TABBER.querySelectorAll(".item"));

  function isLargeScreen() {
    var largeScreenTabsAreVisible = TABS_WRAPPER.scrollHeight > 0;
    return largeScreenTabsAreVisible;
  }

  setUpClickHandlers();
  setUpResizeListener();

  function setUpClickHandlers() {
    PANEL.forEach(function (panel) {
      panel.onclick = handleItemClick;
    });

    LARGE_SCREEN_CONTROLS.forEach(function (control) {
      control.onclick = handleLargeScreenControl;
    });
  }

  function handleLargeScreenControl(e) {
    makeTabActive(e.target.dataset.nav_item_id);
  }

  function makeTabActive(tabId) {
    var currentLargeScreenControl = TABS_WRAPPER.querySelector(
      "[data-nav_item].active"
    );
    var currentPanel = TABBER.querySelector(".item.active");

    currentLargeScreenControl &&
      currentLargeScreenControl.classList.remove("active");
    currentPanel && currentPanel.classList.remove("active");

    var newLargeScreenControl = TABS_WRAPPER.querySelector(
      "[data-tab-id='" + tabId + "']"
    );
    var newPanel = TABBER.querySelector(tabId);

    newLargeScreenControl && newLargeScreenControl.classList.add("active");
    newPanel && newPanel.classList.add("active");
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
    const relatedTab = TABS_WRAPPER.querySelector("[data-nav_item].active");
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

    var noActiveTabs =
      document.querySelector("[data-tabber_nav] .active") === null;

    if (newLayout === "large" && noActiveTabs) {
      displaySustainableChangeTabContent();
    }
  }

  function displaySustainableChangeTabContent() {
    var ID = "#sustainable-change"; // TODO Replace hardcoded ID as part of https://codurance-online.leankit.com/card/1123517749
    var sustainableChangeTab = TABBER.querySelector('a[href="' + ID + '"]');
    var sustainableChangeItem = TABBER.querySelector(ID);

    sustainableChangeTab.classList.add("active");
    sustainableChangeItem.classList.add("active");
  }
})();
