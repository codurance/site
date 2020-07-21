const { simulatePageLoad } = require("./simulatePageLoad");
require("./websiteNavigation");

const HEADER_CLASS = "website-header";
const OPEN_HEADER_CLASS = "website-header--open";
const OPEN_MENU_CLASS = "website-navigation__menu--open";
const MENU_TOGGLE_CLASS = "website-navigation-menu-toggle";
const MENU_SHOWING_SUB_MENU_CLASS =
  "website-navigation__menu--showing-sub-menu";
const SUB_MENU_TOGGLE_CLASS = "website-navigation-menu__sub-menu-toggle";
const SUB_MENU_TOGGLE_PROXY_CLASS = "website-navigation-sub-menu__toggle-proxy";
const OPEN_SUB_MENU_CLASS = "website-navigation-sub-menu--open";
const HEADER_HAS_OPEN_SUBMENU_CLASS = "website-header--has-open-submenu";

const fakeSubMenuScrollHeight = 999;

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

      it("increases the space underneath the toggle, to make the header bigger on large screens", () => {
        expect(subMenuToggle.style.marginBottom).toBe(
          `${fakeSubMenuScrollHeight}px`
        );
      });

      it("updates the main menu, so it slides out of view on small screens", () => {
        expect(menu.classList).toContain(MENU_SHOWING_SUB_MENU_CLASS);
      });

      it("updates the website header, so it doesn't hide itself while the submenu is open", () => {
        expect(header.classList).toContain(HEADER_HAS_OPEN_SUBMENU_CLASS);
      });

      describe("When the sub-menu toggle is clicked again", () => {
        beforeAll(() => {
          subMenuToggle.click();
        });

        it("closes the related sub-menu", () => {
          expect(subMenu.classList).not.toContain(OPEN_SUB_MENU_CLASS);
        });

        it("resets the space underneath the toggle", () => {
          expect(subMenuToggle.style.marginBottom).toBe(``);
        });

        it("remove the special class previously applied to the website header", () => {
          expect(header.classList).not.toContain(HEADER_HAS_OPEN_SUBMENU_CLASS);
        });
      });

      describe("When the main menu toggle is clicked while there is still a sub-menu open ", () => {
        beforeAll(() => {
          menuToggle.click();
        });

        it("closes the related sub-menu", () => {
          expect(subMenu.classList).not.toContain(OPEN_SUB_MENU_CLASS);
        });

        it("remove the special class previously applied to the website header", () => {
          expect(header.classList).not.toContain(HEADER_HAS_OPEN_SUBMENU_CLASS);
        });
      });
    });

    describe("When the sub-menu toggle proxy is clicked", () => {
      beforeAll(() => {
        jest.spyOn(subMenuToggle, "click");
        subMenuToggleProxy.click();
      });
      it("clicks the related real sub-menu toggle", () => {
        expect(subMenuToggle.click).toHaveBeenCalled();
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
  Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
    configurable: true,
    value: fakeSubMenuScrollHeight,
  });

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
