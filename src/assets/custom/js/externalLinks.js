var openExternalLinksInNewTab = function () {
  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  var links = nodeListToArray(window.document.querySelectorAll("a"));

  links.forEach(function (link) {
    link.target = "_blank";
  });
};

window.addEventListener("DOMContentLoaded", openExternalLinksInNewTab);
