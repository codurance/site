var websiteHeader = function () {
  var HEADER = window.document.querySelector(".website-header");
  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    if (startingPositionIsInView()) {
      return;
    }
    hideNav();
  }

  function hideNav() {
    HEADER.classList.add("website-header--hide");
  }

  function startingPositionIsInView() {
    return window.scrollY < HEADER.clientHeight;
  }
};

window.addEventListener("DOMContentLoaded", websiteHeader);
