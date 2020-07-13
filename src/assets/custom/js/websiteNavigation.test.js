const { simulatePageLoad } = require("./simulatePageLoad");
require("./websiteNavigation");

const EXPANDED_MENU_CLASS = "website-navigation__menu--expanded";
const MENU_CLASS = "website-navigation__menu";
const MENU_TOGGLE_CLASS = "website-navigation__menu-toggle";


describe("Website Navigation Menu", () => {

    describe("when the menu toggle is clicked", () => {
        let menuToggle;
        let navMenu;
        beforeAll(() => {
            setUpMocks();
            simulatePageLoad();
            menuToggle = getMockMenuToggle();
            navMenu = getMockNav();
        });

        it("is opened", () => {
            closeNav();

            menuToggle.click();

            expect(navMenu.classList).toContain(EXPANDED_MENU_CLASS);
        });

        it("is collapsed when the menu is initially open", () => {
            openNav();

            menuToggle.click();

            expect(navMenu.classList).not.toContain(EXPANDED_MENU_CLASS);
        });
    });
});

function setUpMocks() {
    createMockMenuToggle();
    createMockNav();
}

function createMockMenuToggle() {
    const menuToggle = window.document.createElement("div");
    menuToggle.classList.add(MENU_TOGGLE_CLASS);
    window.document.body.appendChild(menuToggle);
}

function createMockNav() {
    const navMenu = window.document.createElement("div");
    navMenu.classList.add(MENU_CLASS);
    window.document.body.appendChild(navMenu);
}

function getMockMenuToggle() {
    return window.document.querySelector(`.${MENU_TOGGLE_CLASS}`);
}

function getMockNav() {
    return window.document.querySelector(`.${MENU_CLASS}`);
}
function closeNav() {
    getMockNav().classList.remove(EXPANDED_MENU_CLASS);
}

function openNav() {
    getMockNav().classList.add(EXPANDED_MENU_CLASS);
}