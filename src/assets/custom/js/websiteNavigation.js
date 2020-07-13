var websiteNavigation = function () {
    var COLLAPSED_MENU_CLASS = "website-navigation__menu--collapsed";
    var INITIAL_MENU_STATE_CLASS = "website-navigation__menu--initial-state";

    var NAVIGATION_MENU_SELECTOR = ".website-navigation__menu";
    var menuElement = window.document.querySelector(NAVIGATION_MENU_SELECTOR);

    addMenuToggleEventListener();

    function addMenuToggleEventListener() {
        var MENU_TOGGLE_SELECTOR = ".website-navigation__menu-toggle";
        var menuToggleElement = window.document.querySelector(MENU_TOGGLE_SELECTOR);
        menuToggleElement.addEventListener("click", toggleMenu);
    }

    function toggleMenu() {
        if (menuElement.classList.contains(INITIAL_MENU_STATE_CLASS)) {
            menuElement.classList.remove(INITIAL_MENU_STATE_CLASS);
            openMenu();
            return;
        }
        if (menuElement.classList.contains(COLLAPSED_MENU_CLASS)) {
            openMenu();
            return;
        } 
        collapseMenu();
    }

    function collapseMenu() {
        menuElement.classList.add(COLLAPSED_MENU_CLASS);
    }

    function openMenu() {
        menuElement.classList.remove(COLLAPSED_MENU_CLASS);
    }
}

window.addEventListener("DOMContentLoaded", websiteNavigation);