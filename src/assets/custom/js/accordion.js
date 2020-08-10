(function() {

  var HEADER = window.document.querySelector("header");

  var startingPosition = getScrollPosition();

  var ACTIVE_CLASS = "active";

  var SELECTORS = {
    ACCORDION: "[data-accordion]",
    PANEL: "[data-accordion_panel]",
    PANEL_HEADER: "accordion_panel_header",
    PANEL_ACTIVE: "[data-accordion_panel]." + ACTIVE_CLASS
  };

  var ticking;

  var ACCORDION = window.document.querySelector(SELECTORS.ACCORDION);

  if (ACCORDION === null) {
    return;
  }

  window.addEventListener('scroll', handleScroll);

  function handleScroll() {

    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateStartingPosition();
        ticking = false;
      });

      ticking = true;
    }
  }

  setUpClickHandlers();

  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  function setUpClickHandlers() {
    var PANELS = nodeListToArray(ACCORDION.querySelectorAll(SELECTORS.PANEL));
    PANELS.forEach(function (panel) {
      panel.onclick = handlePanelClick;
    });
  }

  function handlePanelClick(e) {
    if (SELECTORS.PANEL_HEADER in e.target.dataset) {
      togglePanel(this);
    }
    return;
  }

  function togglePanel(panel) {
    var panelIsActive = panel.classList.contains(ACTIVE_CLASS);

    if (panelIsActive) {
      makePanelInactive(panel);
    } else {
      makePanelActive(panel.id);
      scrollToPanel(panel);
      updateStartingPosition();
    }
  }

  function makePanelActive(panelId) {
    var activePanel = ACCORDION.querySelector(SELECTORS.PANEL_ACTIVE);
    activePanel && activePanel.classList.remove(ACTIVE_CLASS);

    var newPanel = ACCORDION.querySelector("#" + panelId);
    newPanel && newPanel.classList.add(ACTIVE_CLASS);
  }

  function makePanelInactive(panel) {
    panel.classList.remove(ACTIVE_CLASS);
  }

  function scrollToPanel(panel) {
    function getTotalTopOffset(panel, total) {
      total = total ? total + panel.offsetTop : panel.offsetTop;
      if (panel.offsetParent && panel.offsetParent.offsetTop) {
        return getTotalTopOffset(panel.offsetParent, total);
      }
      return total;
    }

    var totalTopOffset = getTotalTopOffset(panel);
    var isUpwardScroll = startingPosition > totalTopOffset;
    var SPACING = 10;
    var headerHeight = HEADER ? HEADER.clientHeight : 90;
    var yPosition = isUpwardScroll ? totalTopOffset - SPACING  - headerHeight: totalTopOffset - SPACING;
    window.scrollTo({ top: yPosition, behavior: "smooth" });
  }

  function getScrollPosition () {
    return window.pageYOffset || window.scrollY;
  }

  function updateStartingPosition() {
    startingPosition = getScrollPosition();
  }

})();