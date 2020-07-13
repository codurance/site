var websiteNavigation = function(){
    var NAVIGATION_MENU_SELECTOR = ".website-navigation__menu";
    var COLLAPSED_MENU_CLASS = "website-navigation__menu--collapsed";

    var MENU_TOGGLE_SELECTOR = ".website-navigation__menu-toggle";
    var menuToggleElement = window.document.querySelector(MENU_TOGGLE_SELECTOR);
    menuToggleElement.addEventListener("click", toggleMenu);

    function toggleMenu() {
        var menuElement = window.document.querySelector(NAVIGATION_MENU_SELECTOR);
        if(menuElement.classList.contains(COLLAPSED_MENU_CLASS)) {
            menuElement.classList.remove(COLLAPSED_MENU_CLASS);
        } else {
            menuElement.classList.add(COLLAPSED_MENU_CLASS);
        }
    }
}

window.addEventListener("DOMContentLoaded", websiteNavigation);