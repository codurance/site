var websiteNavigation = function () {
  var OPEN_MENU_CLASS = 'website-navigation__menu--open';
  var OPEN_SUB_MENU_CLASS = 'website-navigation-sub-menu--open';
  var OPEN_HEADER_CLASS = 'website-header--open';
  var HEADER_REVEALED_CLASS = 'website-header--revealed';
  var HEADER_HAS_OPEN_SUBMENU_CLASS = 'website-header--has-open-submenu';
  var MENU_SHOWING_SUB_MENU_CLASS =
    'website-navigation__menu--showing-sub-menu';
  var LEFT_SCROLL_KEY = 37;
  var UP_SCROLL_KEY = 38;
  var RIGHT_SCROLL_KEY = 39;
  var DOWN_SCROLL_KEY = 40;
  var KEYS = [LEFT_SCROLL_KEY, UP_SCROLL_KEY, RIGHT_SCROLL_KEY, DOWN_SCROLL_KEY];

  var header = window.document.querySelector('.website-header');
  var menuToggle = window.document.querySelector(
    '.website-navigation-menu-toggle'
  );
  var menu = window.document.querySelector(
    '#' + menuToggle.getAttribute('aria-controls')
  );

  var subMenuToggles = menu.querySelectorAll(
    '.website-navigation-menu__sub-menu-toggle'
  );
  var subMenuToggleProxies = window.document.querySelectorAll(
    '.website-navigation-sub-menu__toggle-proxy'
  );

  var currentOpenSubMenu = null;

  function setupEventListeners() {
    window.addEventListener('click', handleWindowClick);

    menuToggle.addEventListener('click', toggleMenu);

    Array.prototype.forEach.call(subMenuToggles, function (t) {
      t.addEventListener('click', toggleSubMenu);
    });
    Array.prototype.forEach.call(subMenuToggleProxies, function (t) {
      t.addEventListener('click', clickProxy);
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
    return currentOpenSubMenu.menu === subMenu;
  }

  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; }
    }));
  } catch(e) {}

  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  var wheelOpt = supportsPassive ? { passive: false } : false;

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (KEYS.includes(e.keyCode)) {
      preventDefault(e);
      return false;
    }
  }

  function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('touchmove', preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  function openMenu() {
    header.classList.add(OPEN_HEADER_CLASS, HEADER_REVEALED_CLASS);
    menuToggle.setAttribute('aria-expanded', 'true');
    menu.classList.add(OPEN_MENU_CLASS);
    disableScroll();
    if (currentOpenSubMenu) {
      closeSubMenu(currentOpenSubMenu.menu, currentOpenSubMenu.toggle);
    }
  }

  function closeMenu() {
    header.classList.remove(OPEN_HEADER_CLASS);
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove(OPEN_MENU_CLASS);
    enableScroll();
  }

  function openSubMenu(subMenu, subMenuToggle) {
    currentOpenSubMenu = { menu: subMenu, toggle: subMenuToggle };

    header.classList.add(HEADER_HAS_OPEN_SUBMENU_CLASS);
    subMenuToggle.setAttribute('aria-expanded', 'true');
    subMenu.classList.add(OPEN_SUB_MENU_CLASS);
    menu.classList.add(MENU_SHOWING_SUB_MENU_CLASS);

    subMenuToggle.style.marginBottom = subMenu.scrollHeight + 'px';
  }

  function closeSubMenu(subMenu, subMenuToggle) {
    currentOpenSubMenu = null;

    header.classList.remove(HEADER_HAS_OPEN_SUBMENU_CLASS);
    subMenuToggle.setAttribute('aria-expanded', 'false');
    subMenu.classList.remove(OPEN_SUB_MENU_CLASS);
    menu.classList.remove(MENU_SHOWING_SUB_MENU_CLASS);

    subMenuToggle.style.removeProperty('margin-bottom');
  }

  function getSubMenu(subMenuToggle) {
    return window.document.getElementById(
      subMenuToggle.getAttribute('aria-controls')
    );
  }

  function exposeSharedMethods() {
    window.__CODURANCE = window.__CODURANCE || {};
    window.__CODURANCE.websiteNavigation = {
      closeOpenSubMenu: function () {
        if (currentOpenSubMenu === null) return;
        closeSubMenu(currentOpenSubMenu.menu, currentOpenSubMenu.toggle);
      },
    };
  }

  setupEventListeners();
  exposeSharedMethods();
};

window.addEventListener('DOMContentLoaded', websiteNavigation);
