var websiteNavigation = function () {
    var EXPANDED_MENU_CLASS = "website-navigation__menu--expanded";

    var NAVIGATION_MENU_SELECTOR = ".website-navigation__menu";
    var menuElement = window.document.querySelector(NAVIGATION_MENU_SELECTOR);

    addMenuToggleEventListener();

    function addMenuToggleEventListener() {
        var MENU_TOGGLE_SELECTOR = ".website-navigation__menu-toggle";
        var menuToggleElement = window.document.querySelector(MENU_TOGGLE_SELECTOR);
        menuToggleElement.addEventListener("click", toggleMenu);
    }

    function toggleMenu() {
        if (menuElement.classList.contains(EXPANDED_MENU_CLASS)) {
            collapseMenu();
            return;
        } 
        expandMenu();
    }

    function collapseMenu() {
        menuElement.classList.remove(EXPANDED_MENU_CLASS);
    }

    function expandMenu() {
        menuElement.classList.add(EXPANDED_MENU_CLASS);
    }
}

websiteNavigation();