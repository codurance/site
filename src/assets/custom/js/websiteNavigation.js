var websiteNavigation = function () {
  var OPEN_MENU_CLASS = "website-navigation__menu--open";
  var MENU_TOGGLE_SELECTOR = ".website-navigation-menu-toggle";

  var menuToggle = window.document.querySelector(MENU_TOGGLE_SELECTOR);
  var menu = window.document.querySelector(
    "#" + menuToggle.getAttribute("aria-controls")
  );

  menuToggle.addEventListener("click", toggleMenu);

  function toggleMenu() {
    menu.classList.contains(OPEN_MENU_CLASS) ? closeMenu() : openMenu();
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menu.classList.remove(OPEN_MENU_CLASS);
  }

  function openMenu() {
    menuToggle.setAttribute("aria-expanded", "true");
    menu.classList.add(OPEN_MENU_CLASS);
  }
};

window.addEventListener("DOMContentLoaded", websiteNavigation);
