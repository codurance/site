(function() {
console.log('ACCORDION');


  var ACTIVE_CLASS = "active";

  var SELECTORS = {
    ACCORDION: "[data-accordion]",
    PANEL: "[data-accordion_panel]",
    PANEL_ACTIVE: "[data-accordion_panel]." + ACTIVE_CLASS
  }

  var ACCORDION = window.document.querySelector(SELECTORS.ACCORDION);

  if (ACCORDION === null) {
    return;
  }

  var PANELS = nodeListToArray(ACCORDION.querySelectorAll(SELECTORS.PANEL));

  setUpClickHandlers();

  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  function setUpClickHandlers() {
    PANELS.forEach(function (panel) {
      panel.onclick = handlePanelClick;
    });
  }

  function handlePanelClick(e) {

    var panel = e.target;
    var panelIsActive = panel.classList.contains(ACTIVE_CLASS);
    console.log('panel', panel);

    if (panelIsActive) {
      makePanelInactive(panel);
    } else {
      makePanelActive(panel);
      scrollToPanel(panel);
    }
  }

  function makePanelActive(panel) {
    var currentActivePanel = ACCORDION.querySelector(SELECTORS.PANEL_ACTIVE);

    currentActivePanel.classList.remove(ACTIVE_CLASS);
    panel.classList.add(ACTIVE_CLASS);
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
    var SPACING = 10;
    var header = window.document.querySelector("header");
    var headerHeight = header ? header.clientHeight : 90;
    var yPosition = totalTopOffset - SPACING - headerHeight;
    window.scrollTo({ top: yPosition, behavior: "smooth" });
  }
})();