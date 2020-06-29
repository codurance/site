const simulatePageLoad = () => {
  var DOMContentLoaded_event = document.createEvent("Event");
  DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
  window.document.dispatchEvent(DOMContentLoaded_event);
};
exports.simulatePageLoad = simulatePageLoad;
