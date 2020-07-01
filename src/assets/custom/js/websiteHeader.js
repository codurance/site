var websiteHeader = function () {
  var HEADER_SELECTOR = ".website-header";
  var CLASS = {
    HIDDEN: "website-header--hidden",
    REVEALED: "website-header--revealed",
  };
  var previousWindowPosition;
  var latestWindowPosition;

  var getScrollPosition = function () {
    return window.pageYOffset || window.scrollY;
  };

  var HEADER = window.document.querySelector(HEADER_SELECTOR);
  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    latestWindowPosition = getScrollPosition();
    handleScrollPosition(latestWindowPosition);
    previousWindowPosition = latestWindowPosition;
  }

  function handleScrollPosition(latestWindowPosition) {
    var upwardMovement = previousWindowPosition > latestWindowPosition;

    if (atTheTop(latestWindowPosition)) {
      restoreNaturalPosition();
      return;
    }

    if (startingPositionIsInView(latestWindowPosition)) {
      hideStickyHeader();
      return;
    }

    if (upwardMovement) {
      revealHeader();
      return;
    }

    hideHeader();
  }

  function revealHeader() {
    HEADER.classList.add(CLASS.REVEALED);
    HEADER.classList.remove(CLASS.HIDDEN);
  }

  function hideStickyHeader() {
    HEADER.classList.remove(CLASS.HIDDEN);
  }

  function hideHeader() {
    HEADER.classList.add(CLASS.HIDDEN);
  }

  function restoreNaturalPosition() {
    HEADER.classList.remove(CLASS.REVEALED);
    HEADER.classList.remove(CLASS.HIDDEN);
  }

  function atTheTop(p) {
    return p < 1;
  }

  function startingPositionIsInView(p) {
    return p < HEADER.clientHeight;
  }
};

window.addEventListener("DOMContentLoaded", websiteHeader);
