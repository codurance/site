var websiteNavigation = function () {
  var HEADER_SELECTOR = ".website-header";
  var MENU_TOGGLE_SELECTOR = ".website-navigation-menu-toggle";
  var SUB_MENU_TOGGLE_SELECTOR = ".website-navigation-menu__sub-menu-toggle";
  var SUB_MENU_TOGGLE_PROXY_SELECTOR =
    ".website-navigation-sub-menu__toggle-proxy";

  var MENU_SHOWING_SUB_MENU_CLASS =
    "website-navigation__menu--showing-sub-menu";
  var HEADER_HAS_OPEN_SUBMENU_CLASS = "website-header--has-open-submenu";
  var OPEN_HEADER_CLASS = "website-header--open";
  var OPEN_MENU_CLASS = "website-navigation__menu--open";
  var OPEN_SUB_MENU_CLASS = "website-navigation-sub-menu--open";

  var header = window.document.querySelector(HEADER_SELECTOR);
  var menuToggle = window.document.querySelector(MENU_TOGGLE_SELECTOR);
  var menu = window.document.querySelector(
    "#" + menuToggle.getAttribute("aria-controls")
  );
  var subMenuToggles = menu.querySelectorAll(SUB_MENU_TOGGLE_SELECTOR);
  var subMenuToggleProxies = window.document.querySelectorAll(
    SUB_MENU_TOGGLE_PROXY_SELECTOR
  );

  var currentOpenSubMenu = null;

  function setupEventListeners() {
    window.addEventListener("click", handleWindowClick);

    menuToggle.addEventListener("click", toggleMenu);

    Array.prototype.forEach.call(subMenuToggles, function (t) {
      t.addEventListener("click", toggleSubMenu);
    });
    Array.prototype.forEach.call(subMenuToggleProxies, function (t) {
      t.addEventListener("click", clickProxy);
    });
  }

  function handleWindowClick(e) {
    if (header.contains(e.target) || !currentOpenSubMenu) return;

    closeSubMenu(currentOpenSubMenu.menu, currentOpenSubMenu.toggle);
  }

  function toggleMenu() {
    menu.classList.contains(OPEN_MENU_CLASS) ? closeMenu() : openMenu();
  }

  function toggleSubMenu(e) {
    var subMenuToggle = e.target;
    var subMenu = getSubMenu(subMenuToggle);

    if (currentOpenSubMenu === null) {
      openSubMenu(subMenu, subMenuToggle);
      return;
    }

    if (targetIsCurrentlyOpen(subMenu)) {
      closeSubMenu(subMenu, subMenuToggle);
      return;
    }

    if (!targetIsCurrentlyOpen(subMenu)) {
      var currentlyOpenSubMenu = currentOpenSubMenu.menu;
      var currentlyOpenSubMenuToggle = currentOpenSubMenu.toggle;

      closeSubMenu(currentlyOpenSubMenu, currentlyOpenSubMenuToggle);
      openSubMenu(subMenu, subMenuToggle);
      return;
    }
  }

  function clickProxy(e) {
    var real = window.document.getElementById(
      e.target.dataset.sub_menu_toggle_id
    );
    real.click();
  }

  function targetIsCurrentlyOpen(subMenu) {
    return currentOpenSubMenu.menu === subMenu
  }

  function openMenu() {
    header.classList.add(OPEN_HEADER_CLASS);
    menuToggle.setAttribute("aria-expanded", "true");
    menu.classList.add(OPEN_MENU_CLASS);

    if (currentOpenSubMenu) {
      closeSubMenu(currentOpenSubMenu.menu, currentOpenSubMenu.toggle);
    }
  }

  function closeMenu() {
    header.classList.remove(OPEN_HEADER_CLASS);
    menuToggle.setAttribute("aria-expanded", "false");
    menu.classList.remove(OPEN_MENU_CLASS);
  }

  function openSubMenu(subMenu, subMenuToggle) {
    currentOpenSubMenu = { menu: subMenu, toggle: subMenuToggle };

    header.classList.add(HEADER_HAS_OPEN_SUBMENU_CLASS);
    subMenuToggle.setAttribute("aria-expanded", "true");
    subMenu.classList.add(OPEN_SUB_MENU_CLASS);
    menu.classList.add(MENU_SHOWING_SUB_MENU_CLASS);

    subMenuToggle.style.marginBottom = subMenu.scrollHeight + "px";
  }

  function closeSubMenu(subMenu, subMenuToggle) {
    currentOpenSubMenu = null;

    header.classList.remove(HEADER_HAS_OPEN_SUBMENU_CLASS);
    subMenuToggle.setAttribute("aria-expanded", "false");
    subMenu.classList.remove(OPEN_SUB_MENU_CLASS);
    menu.classList.remove(MENU_SHOWING_SUB_MENU_CLASS);

    subMenuToggle.style.removeProperty('margin-bottom');
  }

  function getSubMenu(subMenuToggle) {
    return window.document.getElementById(
      subMenuToggle.getAttribute("aria-controls")
    );
  }

  setupEventListeners();
};

window.addEventListener("DOMContentLoaded", websiteNavigation);
