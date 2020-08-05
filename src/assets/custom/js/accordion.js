(function() {

  var ACTIVE_CLASS = "active";

  var SELECTORS = {
    ACCORDION: "[data-accordion]",
    PANEL: "[data-accordion_panel]",
    PANEL_HEADER: "accordion_panel_header",
    PANEL_ACTIVE: "[data-accordion_panel]." + ACTIVE_CLASS
  };

  var ACCORDION = window.document.querySelector(SELECTORS.ACCORDION);

  if (ACCORDION === null) {
    return;
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
    return
  }

  function togglePanel(panel) {
    var panelIsActive = panel.classList.contains(ACTIVE_CLASS);

    if (panelIsActive) {
      makePanelInactive(panel);
    } else {
      makePanelActive(panel.id);
      scrollToPanel(panel);
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
    var SPACING = 10;
    var header = window.document.querySelector("header");
    var headerHeight = header ? header.clientHeight : 90;
    var yPosition = totalTopOffset - SPACING - headerHeight;
    window.scrollTo({ top: yPosition, behavior: "smooth" });
  }
})();