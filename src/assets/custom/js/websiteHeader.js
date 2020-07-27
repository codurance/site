var websiteHeader = function () {
  var REVEALED_CLASS = "website-header--revealed";
  var HEADER_HEIGHT = header.clientHeight;
  var scrollTolerance = 2;

  var previousWindowPosition;
  var latestWindowPosition;
  var ticking;

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

    var subMenuOpen = header.classList.contains(HEADER_HAS_OPEN_SUBMENU_CLASS);

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
    header.classList.add(REVEALED_CLASS);
  }

  function restoreNaturalPosition() {
    header.classList.remove(REVEALED_CLASS);
  }

  function atTheTop(p) {
    return p < scrollTolerance;
  }

  function startingPositionIsInView(p) {
    return p < HEADER_HEIGHT;
  }
};

window.addEventListener("DOMContentLoaded", websiteHeader);
