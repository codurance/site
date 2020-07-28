var websiteHeader = function () {
  var header = window.document.querySelector('.website-header');
  var HEADER_REVEALED_CLASS = 'website-header--revealed';
  var HEADER_HEIGHT = header.clientHeight;
  var scrollTolerance = 2;

  var previousWindowPosition = 0;
  var latestWindowPosition;
  var ticking;

  window.addEventListener('scroll', handleScroll);

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

    if (
      startingPositionIsInView(latestWindowPosition) ||
      atTheTop(latestWindowPosition) ||
      upwardMovement
    ) {
      revealHeader();
      return;
    }

    if (downwardMovement && !websiteHeaderOpen()) {
      if (
        window.__CODURANCE &&
        window.__CODURANCE.websiteNavigation &&
        window.__CODURANCE.websiteNavigation.closeOpenSubMenu
        ) {
        window.__CODURANCE.websiteNavigation.closeOpenSubMenu();
      }

      hideHeader();
      return;
    }
  }

  function revealHeader() {
    header.classList.add(HEADER_REVEALED_CLASS);
  }

  function hideHeader() {
    header.classList.remove(HEADER_REVEALED_CLASS);
  }

  function atTheTop(p) {
    return p < scrollTolerance;
  }

  function startingPositionIsInView(p) {
    return p < HEADER_HEIGHT;
  }

  function websiteHeaderOpen() {
    return header.classList.contains('website-header--open');
  }

  var getScrollPosition = function () {
    return window.pageYOffset || window.scrollY;
  };
};

window.addEventListener('DOMContentLoaded', websiteHeader);
