const { simulatePageLoad } = require("./simulatePageLoad");
require("./websiteNavigation");

const COLLAPSED_MENU_CLASS = "website-navigation__menu--collapsed";
const MENU_CLASS = "website-navigation__menu";
const MENU_TOGGLE_CLASS= "website-navigation__menu-toggle";

describe.only("Website Navigation Menu", () => {
    let menuToggle;
    let navMenu;
    beforeAll(() => {
        createMockMenuToggle();
        createMockNav();
        simulatePageLoad();
        menuToggle = getMockMenuToggle();
        navMenu = getMockNav();
        navMenu.classList.forEach(e => console.log(e))
    });
    
    it("stays collapsed when the menu toggle is not clicked", () => {
        resetNav();

        expect(navMenu.classList).toContain(COLLAPSED_MENU_CLASS);
    });

    it("is open when the menu toggle is clicked", () => {
        resetNav();

        menuToggle.click();

        expect(navMenu.classList).not.toContain(COLLAPSED_MENU_CLASS);
    });

    it("is collapsed when the menu is initially open and the menu toggle is clicked", () => {
        menuToggle.click();
        
        expect(navMenu.classList).toContain(COLLAPSED_MENU_CLASS);
    });
});

function createMockMenuToggle() {
    const menuToggle = window.document.createElement("div");
    menuToggle.classList.add(MENU_TOGGLE_CLASS);
    window.document.body.appendChild(menuToggle );
  }

function createMockNav() {
    const navMenu = window.document.createElement("div");
    navMenu.classList.add(MENU_CLASS);
    navMenu.classList.add(COLLAPSED_MENU_CLASS);
    window.document.body.appendChild(navMenu);
  }

function getMockMenuToggle() {
    return window.document.querySelector(`.${MENU_TOGGLE_CLASS}`);
}

function getMockNav() {
    return window.document.querySelector(`.${MENU_CLASS}`);
}
function resetNav() {
    let navMenu = getMockNav();
    if(navMenu && !navMenu.classList.contains(COLLAPSED_MENU_CLASS)) {
        navMenu.classList.add(COLLAPSED_MENU_CLASS);
    }
}