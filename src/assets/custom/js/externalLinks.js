var openExternalLinksInNewTab = function () {
  function isInternal(link) {
    var origin = window.location.protocol + "//" + window.location.hostname;
    return link.href.indexOf(origin) === 0;
  }

  function hasNoTarget(link) {
    return !link.target;
  }

  function hasNoRel(link) {
    return !link.rel;
  }

  var links = window.document.querySelectorAll("a");

  Array.prototype.forEach.call(links, function (link) {
    if (isInternal(link)) {
      return;
    }
    if (hasNoTarget(link)) {
      link.target = "_blank";
    }
    if (hasNoRel(link) && link.target === "_blank") {
      link.rel = "noopener noreferrer";
    }
  });
};

window.addEventListener("DOMContentLoaded", openExternalLinksInNewTab);
