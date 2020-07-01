var websiteHeader = function () {
  var HEADER_SELECTOR = ".website-header";
  var REVEALED_CLASS = "website-header--revealed";
  var previousWindowPosition;
  var latestWindowPosition;
  var ticking;

  var getScrollPosition = function () {
    return window.pageYOffset || window.scrollY;
  };

  var HEADER = window.document.querySelector(HEADER_SELECTOR);
  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    latestWindowPosition = getScrollPosition();

    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleScrollPosition(latestWindowPosition);
        previousWindowPosition = latestWindowPosition;
        ticking = false;
      });

      ticking = true;
    }
  }

  function handleScrollPosition(latestWindowPosition) {
    var tolerance = 2;

    var upwardMovement =
      previousWindowPosition > latestWindowPosition + tolerance;

    if (atTheTop(latestWindowPosition)) {
      restoreNaturalPosition();
      return;
    }

    if (startingPositionIsInView(latestWindowPosition)) {
      return;
    }

    if (upwardMovement) {
      revealHeader();
      return;
    }
  }

  function revealHeader() {
    HEADER.classList.add(REVEALED_CLASS);
  }

  function restoreNaturalPosition() {
    HEADER.classList.remove(REVEALED_CLASS);
  }

  function atTheTop(p) {
    return p < 1;
  }

  function startingPositionIsInView(p) {
    return p < HEADER.clientHeight;
  }
};

window.addEventListener("DOMContentLoaded", websiteHeader);
