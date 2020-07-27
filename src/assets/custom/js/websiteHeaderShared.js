var HEADER_SELECTOR = ".website-header";
var HEADER_HAS_OPEN_SUBMENU_CLASS = "website-header--has-open-submenu";
var HEADER_REVEALED_CLASS = "website-header--revealed";
var OPEN_HEADER_CLASS = "website-header--open";
var MENU_TOGGLE_SELECTOR = ".website-navigation-menu-toggle";
var MENU_SHOWING_SUB_MENU_CLASS =
"website-navigation__menu--showing-sub-menu";
var OPEN_SUB_MENU_CLASS = "website-navigation-sub-menu--open";

var header = window.document.querySelector(HEADER_SELECTOR);
var menuToggle = window.document.querySelector(MENU_TOGGLE_SELECTOR);
var menu = window.document.querySelector(
  "#" + menuToggle.getAttribute("aria-controls")
);



var getScrollPosition = function () {
  return window.pageYOffset || window.scrollY;
};



