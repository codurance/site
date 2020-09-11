(function () {
  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  var ACTIVE_CLASS = "active";

  var SELECTORS = {
    TABBER: "[data-tabber]",
    TABBER_INNER: "tabber-panel__inner",
    LARGE_SCREEN_CONTROL: "[data-large_screen_control]",
    LARGE_SCREEN_CONTROL_ACTIVE: "[data-large_screen_control]." + ACTIVE_CLASS,
    PANEL: "[data-tabber_panel]",
    PANEL_ACTIVE: "[data-tabber_panel]." + ACTIVE_CLASS,
  };

  var TABBER = window.document.querySelector(SELECTORS.TABBER);

  if (TABBER === null) {
    return;
  }

  var LARGE_SCREEN_CONTROLS = nodeListToArray(
    TABBER.querySelectorAll(SELECTORS.LARGE_SCREEN_CONTROL)
  );

  var PANELS = nodeListToArray(TABBER.querySelectorAll(SELECTORS.PANEL));

  var clickedTargetPathArray;

  function isLargeScreen() {
    var largeScreenTabsAreVisible = LARGE_SCREEN_CONTROLS[0].scrollHeight > 0;
    return largeScreenTabsAreVisible;
  }

  setUpClickHandlers();
  setUpResizeListener();

  function setUpClickHandlers() {
    PANELS.forEach(function (panel) {
      panel.onclick = handlePanelClick;
    });

    LARGE_SCREEN_CONTROLS.forEach(function (control) {
      control.onclick = handleLargeScreenControl;
    });
  }

  function handleLargeScreenControl(e) {
    makeTabActive(e.target.dataset.related_tab);
  }

  function makeTabActive(tabId) {
    var activeLargeScreenControl = TABBER.querySelector(
      SELECTORS.LARGE_SCREEN_CONTROL_ACTIVE
    );
    var activePanel = TABBER.querySelector(SELECTORS.PANEL_ACTIVE);

    activeLargeScreenControl &&
      activeLargeScreenControl.classList.remove(ACTIVE_CLASS);
    activePanel && activePanel.classList.remove(ACTIVE_CLASS);

    var newLargeScreenControl = TABBER.querySelector(
      "[data-related_tab='" + tabId + "']"
    );
    var newPanel = TABBER.querySelector("#" + tabId);

    newLargeScreenControl && newLargeScreenControl.classList.add(ACTIVE_CLASS);
    newPanel && newPanel.classList.add(ACTIVE_CLASS);
  }

  function handlePanelClick(e) {
    if (isLargeScreen()) {
      return;
    }
    clickedTargetPathArray = e.target;

    togglePanel(this, clickedTargetPathArray);
  }

  function togglePanel(panel) {
    var panelIsActive = panel.classList.contains(ACTIVE_CLASS);

    if (panelIsActive) {
      makePanelInactive(panel);
    } else {
      makePanelActive(panel);
      scrollToPanel(panel);
    }
  }

  function makePanelInactive(panel) {
    // for (var i = 0; i < clickedTargetPathArray.length; i++) {
    //   if(clickedTargetPathArray[i].className === SELECTORS.TABBER_INNER){
    //     return;
    //   }
    // }
    var panelInner = panel.querySelector(".tabber-panel__inner");


    if (panelInner.contains(clickedTargetPathArray)) {
      return;
    }

    panel.classList.remove(ACTIVE_CLASS);
    const relatedTab = TABBER.querySelector(
      SELECTORS.LARGE_SCREEN_CONTROL_ACTIVE
    );
    relatedTab && relatedTab.classList.remove(ACTIVE_CLASS);
  }

  function makePanelActive(panel) {
    makeTabActive(panel.id);
  }

  function scrollToPanel(panel) {
    function getTotalOffset(panel, total) {
      total = total ? total + panel.offsetTop : panel.offsetTop;
      if (panel.offsetParent && panel.offsetParent.offsetTop) {
        return getTotalOffset(panel.offsetParent, total);
      }
      return total;
    }

    var totalOffset = getTotalOffset(panel);
    var SPACING = 10;
    var header = document.querySelector("header");
    var headerHeight = header ? header.clientHeight : 90;
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
      document.querySelector(SELECTORS.LARGE_SCREEN_CONTROL_ACTIVE) === null;

    if (newLayout === "large" && noActiveTabs) {
      makeFirstTabActive();
    }
  }

  function makeFirstTabActive() {
    LARGE_SCREEN_CONTROLS[0].classList.add(ACTIVE_CLASS);
    PANELS[0].classList.add(ACTIVE_CLASS);
  }
})();
