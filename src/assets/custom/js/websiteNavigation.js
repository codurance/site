var websiteNavigation = function () {
  var HEADER_SELECTOR = ".website-header";
  var MENU_TOGGLE_SELECTOR = ".website-navigation-menu-toggle";

  var OPEN_HEADER_CLASS = "website-header--open";
  var OPEN_MENU_CLASS = "website-navigation__menu--open";

  var header = window.document.querySelector(HEADER_SELECTOR);
  var menuToggle = window.document.querySelector(MENU_TOGGLE_SELECTOR);
  var menu = window.document.querySelector(
    "#" + menuToggle.getAttribute("aria-controls")
  );

  menuToggle.addEventListener("click", toggleMenu);

  function toggleMenu() {
    menu.classList.contains(OPEN_MENU_CLASS) ? closeMenu() : openMenu();
  }

  function closeMenu() {
    header.classList.remove(OPEN_HEADER_CLASS);
    menuToggle.setAttribute("aria-expanded", "false");
    menu.classList.remove(OPEN_MENU_CLASS);
  }

  function openMenu() {
    header.classList.add(OPEN_HEADER_CLASS);
    menuToggle.setAttribute("aria-expanded", "true");
    menu.classList.add(OPEN_MENU_CLASS);
  }
};

window.addEventListener("DOMContentLoaded", websiteNavigation);
