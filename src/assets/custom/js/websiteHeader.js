var websiteHeader = function () {
  var HEADER_SELECTOR = ".website-header";
  var CLASS = {
    HIDDEN: "website-header--hidden",
  };

  var HEADER = window.document.querySelector(HEADER_SELECTOR);
  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    startingPositionIsInView() ? setState("original") : setState("hidden");
  }

  function setState(state) {
    switch (state) {
      case "original":
        HEADER.classList.remove(CLASS.HIDDEN);
        break;
      case "hidden":
        HEADER.classList.add(CLASS.HIDDEN);
        break;

      default:
        break;
    }
  }

  function startingPositionIsInView() {
    return window.scrollY < HEADER.clientHeight;
  }
};

window.addEventListener("DOMContentLoaded", websiteHeader);
