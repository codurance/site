var websiteHeader = function () {
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

    if (startingPositionIsInView(latestWindowPosition) || atTheTop(latestWindowPosition) || upwardMovement) {
      revealHeader();
      return;
    }

    if (downwardMovement) {
      if (subMenuOpen) closeSubMenu(currentOpenSubMenu.menu, currentOpenSubMenu.toggle);
      hideHeader();
      return;
    }
  }

  function revealHeader() {
    header.classList.add(REVEALED_CLASS);
  }

  function hideHeader() {
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
