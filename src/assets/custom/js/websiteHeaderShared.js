var HEADER_SELECTOR = ".website-header";
var HEADER_HAS_OPEN_SUBMENU_CLASS = "website-header--has-open-submenu";
var MENU_TOGGLE_SELECTOR = ".website-navigation-menu-toggle";
var MENU_SHOWING_SUB_MENU_CLASS =
"website-navigation__menu--showing-sub-menu";
var OPEN_SUB_MENU_CLASS = "website-navigation-sub-menu--open";

var header = window.document.querySelector(HEADER_SELECTOR);
var menuToggle = window.document.querySelector(MENU_TOGGLE_SELECTOR);
var menu = window.document.querySelector(
  "#" + menuToggle.getAttribute("aria-controls")
);

var currentOpenSubMenu = null;

var getScrollPosition = function () {
  return window.pageYOffset || window.scrollY;
};

function closeSubMenu(subMenu, subMenuToggle) {
  currentOpenSubMenu = null;

  header.classList.remove(HEADER_HAS_OPEN_SUBMENU_CLASS);
  subMenuToggle.setAttribute("aria-expanded", "false");
  subMenu.classList.remove(OPEN_SUB_MENU_CLASS);
  menu.classList.remove(MENU_SHOWING_SUB_MENU_CLASS);

  subMenuToggle.style.removeProperty('margin-bottom');
}