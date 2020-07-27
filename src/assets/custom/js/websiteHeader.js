var websiteHeader = function () {
  var HEADER_SELECTOR = ".website-header";
  var REVEALED_CLASS = "website-header--revealed";
  var HEADER_HAS_OPEN_SUBMENU_CLASS = "website-header--has-open-submenu";
  var scrollTolerance = 2;

  var previousWindowPosition;
  var latestWindowPosition;
  var ticking;

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
    var upwardMovement =
      previousWindowPosition > latestWindowPosition + scrollTolerance;
    var downwardMovement =
      previousWindowPosition < latestWindowPosition - scrollTolerance;

    var subMenuOpen = HEADER.classList.contains(HEADER_HAS_OPEN_SUBMENU_CLASS);

    if (atTheTop(latestWindowPosition) || (downwardMovement && !subMenuOpen)) {
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
    return p < scrollTolerance;
  }

  function startingPositionIsInView(p) {
    return p < HEADER.clientHeight;
  }
};

window.addEventListener("DOMContentLoaded", websiteHeader);
