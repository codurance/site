var HEADER_SELECTOR = ".website-header";
var HEADER_HAS_OPEN_SUBMENU_CLASS = "website-header--has-open-submenu";

var header = window.document.querySelector(HEADER_SELECTOR);


var getScrollPosition = function () {
  return window.pageYOffset || window.scrollY;
};