var openExternalLinksInNewTab = function () {
  function isInternal(link) {
    return link.href.indexOf(window.location.href) === 0;
  }

  var links = window.document.querySelectorAll("a");

  Array.prototype.forEach.call(links, function (link) {
    if (isInternal(link)) {
      return;
    }
    link.target = "_blank";
  });
};

window.addEventListener("DOMContentLoaded", openExternalLinksInNewTab);
