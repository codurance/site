const { simulatePageLoad } = require("./simulatePageLoad");
require("./websiteNavigation");

const HEADER_CLASS = "website-header";
const OPEN_HEADER_CLASS = "website-header--open";
const OPEN_MENU_CLASS = "website-navigation__menu--open";
const MENU_TOGGLE_CLASS = "website-navigation-menu-toggle";
const SUB_MENU_TOGGLE_CLASS = "website-navigation-menu__sub-menu-toggle";
const SUB_MENU_TOGGLE_PROXY_CLASS = "website-navigation-sub-menu__toggle-proxy";
const OPEN_SUB_MENU_CLASS = "website-navigation-sub-menus__menu--open";

let header;
let menu;
let menuToggle;
let subMenu;
let subMenuToggle;
let subMenuToggleProxy;

describe("Website Navigation Menu", () => {
  describe("Given the page loads with a menu and a sub-menu", () => {
    beforeAll(() => {
      setUpMocks();
      simulatePageLoad();
      captureMocks();
    });

    describe("When the menu toggle is clicked", () => {
      beforeAll(() => {
        menuToggle.click();
      });

      it("opens the related menu", () => {
        expect(menu.classList).toContain(OPEN_MENU_CLASS);
      });

      it("updates itself to look like a close button", () => {
        expect(menuToggle.getAttribute("aria-expanded")).toBe("true");
      });

      it("updates the website header, which changes colour when the menu opens", () => {
        expect(header.classList).toContain(OPEN_HEADER_CLASS);
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

        it("returns the website header to it's original look", () => {
          expect(header.classList).not.toContain(OPEN_HEADER_CLASS);
        });
      });
    });

    describe("When the sub-menu toggle is clicked", () => {
      beforeAll(() => {
        subMenuToggle.click();
      });

      it("opens the related sub-menu", () => {
        expect(subMenu.classList).toContain(OPEN_SUB_MENU_CLASS);
      });

      describe("When the sub-menu toggle is clicked again", () => {
        beforeAll(() => {
          subMenuToggle.click();
        });

        it("closes the related sub-menu", () => {
          expect(subMenu.classList).not.toContain(OPEN_SUB_MENU_CLASS);
        });
      });
    });

    describe("When the sub-menu toggle proxy is clicked", () => {
      it("toggles the related sub-menu", () => {
        subMenuToggleProxy.click();
        expect(subMenu.classList).toContain(OPEN_SUB_MENU_CLASS);
        subMenuToggleProxy.click();
        expect(subMenu.classList).not.toContain(OPEN_SUB_MENU_CLASS);
      });
    });
  });
});

function setUpMocks() {
  createMockHeader();
  createMockMenuToggle();
  createMockMenu();
  createMockSubMenu();
}

function captureMocks() {
  header = getMockHeader();
  menu = getMockMenu();
  menuToggle = getMockMenuToggle();
  subMenu = getMockSubMenu();
  subMenuToggle = getMockSubMenuToggle();
  subMenuToggleProxy = getMockSubMenuToggleProxy();
}

const MENU_ID = "mockMenuId";
const SUB_MENU_ID = "mockSubMenuId";
const SUB_MENU_TOGGLE_ID = "mockSubMenuToggleId";

function createMockHeader() {
  const header = window.document.createElement("div");
  header.classList.add(HEADER_CLASS);
  window.document.body.appendChild(header);
}

function createMockMenuToggle() {
  const menuToggle = window.document.createElement("button");
  menuToggle.setAttribute("aria-controls", MENU_ID);
  menuToggle.setAttribute("aria-expanded", false);
  menuToggle.classList.add(MENU_TOGGLE_CLASS);
  window.document.body.appendChild(menuToggle);
}

function createMockMenu() {
  const menu = window.document.createElement("div");
  menu.id = MENU_ID;

  const subMenuToggle = window.document.createElement("button");
  subMenuToggle.setAttribute("aria-controls", SUB_MENU_ID);
  subMenuToggle.setAttribute("aria-expanded", false);
  subMenuToggle.classList.add(SUB_MENU_TOGGLE_CLASS);
  subMenuToggle.id = SUB_MENU_TOGGLE_ID;

  window.document.body.appendChild(menu);
  menu.appendChild(subMenuToggle);
}

function createMockSubMenu() {
  const subMenu = window.document.createElement("div");
  subMenu.id = SUB_MENU_ID;

  const subMenuToggleProxy = window.document.createElement("button");
  subMenuToggleProxy.setAttribute(
    "data-sub_menu_toggle_id",
    SUB_MENU_TOGGLE_ID
  );
  subMenuToggleProxy.classList.add(SUB_MENU_TOGGLE_PROXY_CLASS);

  window.document.body.appendChild(subMenu);
  subMenu.appendChild(subMenuToggleProxy);
}

function getMockHeader() {
  return window.document.querySelector(`.${HEADER_CLASS}`);
}

function getMockMenuToggle() {
  return window.document.querySelector(`.${MENU_TOGGLE_CLASS}`);
}

function getMockMenu() {
  return window.document.querySelector(`#${MENU_ID}`);
}

function getMockSubMenuToggle() {
  return window.document.querySelector(`.${SUB_MENU_TOGGLE_CLASS}`);
}

function getMockSubMenuToggleProxy() {
  return window.document.querySelector(`.${SUB_MENU_TOGGLE_PROXY_CLASS}`);
}

function getMockSubMenu() {
  return window.document.querySelector(`#${SUB_MENU_ID}`);
}
