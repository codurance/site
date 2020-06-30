var websiteHeader = function () {
  function hideNav() {
    var header = window.document.querySelector(".website-header");
    header.classList.add("website-header--hide");
  }
  window.addEventListener("scroll", hideNav);
};

window.addEventListener("DOMContentLoaded", websiteHeader);
