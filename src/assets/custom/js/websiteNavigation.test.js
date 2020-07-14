const { simulatePageLoad } = require("./simulatePageLoad");
require("./websiteNavigation");

const OPEN_MENU_CLASS = "website-navigation__menu--open";
const MENU_TOGGLE_CLASS = "website-navigation-menu-toggle";

let menuToggle;
let menu;

describe("Website Navigation Menu", () => {
  describe("When the page loads and there is a menu toggle and a related menu", () => {
    beforeAll(() => {
      setUpMocks();
      simulatePageLoad();
      menuToggle = getMockMenuToggle();
      menu = getMockMenu();
    });

    describe("And then the menu toggle is clicked", () => {
      beforeAll(() => {
        menuToggle.click();
      });

      it("opens the related menu", () => {
        expect(menu.classList).toContain(OPEN_MENU_CLASS);
      });

      it("updates itself to look like a close button", () => {
        expect(menuToggle.getAttribute("aria-expanded")).toBe("true");
      });

      describe("When the menu toggle is clicked again", () => {
        beforeAll(() => {
          menuToggle.click();
        });

        it("closes the related menu", () => {
          expect(menu.classList).not.toContain(OPEN_MENU_CLASS);
        });

        it("returns to it's original look of a open menu button", () => {
          expect(menuToggle.getAttribute("aria-expanded")).toBe("false");
        });
      });
    });
  });
});

function setUpMocks() {
  createMockMenuToggle();
  createMockMenu();
}

const MENU_ID = "mockMenuId";

function createMockMenuToggle() {
  const menuToggle = window.document.createElement("div");
  menuToggle.setAttribute("aria-controls", MENU_ID);
  menuToggle.setAttribute("aria-expanded", false);
  menuToggle.classList.add(MENU_TOGGLE_CLASS);
  window.document.body.appendChild(menuToggle);
}

function createMockMenu() {
  const menu = window.document.createElement("div");
  menu.id = MENU_ID;
  menu.setAttribute("aria-expanded", false);
  window.document.body.appendChild(menu);
}

function getMockMenuToggle() {
  return window.document.querySelector(`.${MENU_TOGGLE_CLASS}`);
}

function getMockMenu() {
  return window.document.querySelector(`#${MENU_ID}`);
}
