var openExternalLinksInNewTab = function () {
  function isInternal(link) {
    var origin = window.location.protocol + "//" + window.location.hostname;
    return link.href.indexOf(origin) === 0;
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
