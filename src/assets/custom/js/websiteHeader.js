var websiteHeader = function () {
  var HEADER_SELECTOR = ".website-header";
  var CLASS = {
    HIDDEN: "website-header--hidden",
  };

  var HEADER = window.document.querySelector(HEADER_SELECTOR);
  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    if (startingPositionIsInView()) {
      return;
    }
    hideNav();
  }

  function hideNav() {
    HEADER.classList.add(CLASS.HIDDEN);
  }

  function startingPositionIsInView() {
    return window.scrollY < HEADER.clientHeight;
  }
};

window.addEventListener("DOMContentLoaded", websiteHeader);
