const simulatePageLoad = () => {
  window.document.dispatchEvent(
    new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true,
    })
  );
};
exports.simulatePageLoad = simulatePageLoad;
