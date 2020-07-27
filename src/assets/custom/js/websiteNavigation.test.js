const { simulatePageLoad } = require("./simulatePageLoad");
require("./websiteHeaderShared");
require("./websiteNavigation");

const HEADER_CLASS = "website-header";
const OUTSIDE_HEADER_CLASS = "outside-header";
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
Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
  configurable: true,
  value: fakeSubMenuScrollHeight,
});

let header;
let outsideHeader;
let menu;
let menuToggle;
let servicesSubMenu;
let servicesSubMenuToggle;
let aboutSubMenu;
let aboutSubMenuToggle;
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
        servicesSubMenuToggle.click();
      });

      it("opens the related sub-menu", () => {
        expect(servicesSubMenu.classList).toContain(OPEN_SUB_MENU_CLASS);
      });

      it("increases the space underneath the toggle, to make the header bigger on large screens", () => {
        expect(servicesSubMenuToggle.style.marginBottom).toBe(
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
          servicesSubMenuToggle.click();
        });

        it("closes the related sub-menu", () => {
          expect(servicesSubMenu.classList).not.toContain(OPEN_SUB_MENU_CLASS);
        });

        it("resets the space underneath the toggle", () => {
          expect(servicesSubMenuToggle.style.marginBottom).toBe(``);
        });

        it("remove the special class previously applied to the website header", () => {
          expect(header.classList).not.toContain(HEADER_HAS_OPEN_SUBMENU_CLASS);
        });
      });

      describe("When a different sub-menu toggle is clicked", () => {
        beforeAll(() => {
          aboutSubMenuToggle.click();
        });

        it("closes the currently open sub-menu", () => {
          expect(servicesSubMenu.classList).not.toContain(OPEN_SUB_MENU_CLASS);
        });

        it("resets space under the currently open sub-menu", () => {
          expect(servicesSubMenuToggle.style.marginBottom).toBe(``);
        });

        it("opens the newly clicked sub-menu", () => {
          expect(aboutSubMenu.classList).toContain(OPEN_SUB_MENU_CLASS);
        });

        it("increases the space underneath the newly clicked toggle, to make the header bigger on large screens", () => {
          expect(aboutSubMenuToggle.style.marginBottom).toBe(
            `${fakeSubMenuScrollHeight}px`
          );
        });

      });

      describe("When the main menu toggle is clicked while there is still a sub-menu open ", () => {
        beforeAll(() => {
          menuToggle.click();
        });

        it("closes the related sub-menu", () => {
          expect(servicesSubMenu.classList).not.toContain(OPEN_SUB_MENU_CLASS);
        });

        it("remove the special class previously applied to the website header", () => {
          expect(header.classList).not.toContain(HEADER_HAS_OPEN_SUBMENU_CLASS);
        });
      });

      describe("When the user clicks outside of the header", () => {
        beforeAll(() => {
          outsideHeader.click();
        })
        it("closes the open sub-menu", () => {
          expect(servicesSubMenu.classList).not.toContain(OPEN_SUB_MENU_CLASS);
        });

        it("resets the space underneath the toggle", () => {
          expect(servicesSubMenuToggle.style.marginBottom).toBe(``);
        });

        it("remove the special class previously applied to the website header", () => {
          expect(header.classList).not.toContain(HEADER_HAS_OPEN_SUBMENU_CLASS);
        });
      });
    });

    describe("When the sub-menu toggle proxy is clicked", () => {
      beforeAll(() => {
        jest.spyOn(servicesSubMenuToggle, "click");
        subMenuToggleProxy.click();
      });
      it("clicks the related real sub-menu toggle", () => {
        expect(servicesSubMenuToggle.click).toHaveBeenCalled();
      });
    });
  });
});

function setUpMocks() {
  createMockHeader();
  createMockOutsideHeader();
  createMockMenuToggle();
  createMockMenu();
  createMockSubMenu(SERVICES_SUB_MENU_ID_1, SERVICES_SUB_MENU_TOGGLE_ID);
  createMockSubMenuToggle(SERVICES_SUB_MENU_ID_1, SERVICES_SUB_MENU_TOGGLE_ID);
  createMockSubMenu(ABOUT_SUB_MENU_ID, ABOUT_SUB_MENU_TOGGLE_ID);
  createMockSubMenuToggle(ABOUT_SUB_MENU_ID, ABOUT_SUB_MENU_TOGGLE_ID);
}

function captureMocks() {
  header = getMockHeader();
  outsideHeader = getMockOutsideHeader();
  menu = getMockMenu();
  menuToggle = getMockMenuToggle();
  servicesSubMenu = getMockSubMenu(SERVICES_SUB_MENU_ID_1);
  servicesSubMenuToggle = getMockSubMenuToggle(SERVICES_SUB_MENU_TOGGLE_ID);
  subMenuToggleProxy = getMockSubMenuToggleProxy();
  aboutSubMenu = getMockSubMenu(ABOUT_SUB_MENU_ID);
  aboutSubMenuToggle = getMockSubMenuToggle(ABOUT_SUB_MENU_TOGGLE_ID);
}

const MENU_ID = "mockMenuId";
const SERVICES_SUB_MENU_ID_1 = "mockServicesSubMenuId";
const SERVICES_SUB_MENU_TOGGLE_ID = "mockServicesSubMenuToggleId";
const ABOUT_SUB_MENU_ID = "mockAboutSubMenuId";
const ABOUT_SUB_MENU_TOGGLE_ID = "mockAboutSubMenuToggleId";

function createMockHeader() {
  const header = window.document.createElement("div");
  header.classList.add(HEADER_CLASS);
  window.document.body.appendChild(header);
}

function createMockOutsideHeader() {
  const outsideHeader = window.document.createElement("div");
  outsideHeader.classList.add(OUTSIDE_HEADER_CLASS);
  window.document.body.appendChild(outsideHeader);
}

function createMockMenuToggle() {
  const menuToggle = window.document.createElement("button");
  menuToggle.setAttribute("aria-controls", MENU_ID);
  menuToggle.setAttribute("aria-expanded", false);
  menuToggle.classList.add(MENU_TOGGLE_CLASS);
  window.document.body.appendChild(menuToggle);
}

function createMockMenu() {
  const header = getMockHeader();
  const menu = window.document.createElement("div");
  menu.id = MENU_ID;

  header.appendChild(menu);
}

function createMockSubMenuToggle(subMenuID, subMenuToggleID) {
  const menu = getMockMenu();
  const subMenuToggle = window.document.createElement("button");

  subMenuToggle.setAttribute("aria-controls", subMenuID);
  subMenuToggle.setAttribute("aria-expanded", false);
  subMenuToggle.classList.add(SUB_MENU_TOGGLE_CLASS);
  subMenuToggle.id = subMenuToggleID;

  menu.appendChild(subMenuToggle);
}

function createMockSubMenu(subMenuID, subMenuToggleID) {
  const menu = getMockMenu();
  const subMenu = window.document.createElement("div");
  subMenu.id = subMenuID;

  const subMenuToggleProxy = window.document.createElement("button");
  subMenuToggleProxy.setAttribute(
    "data-sub_menu_toggle_id",
    subMenuToggleID
  );
  subMenuToggleProxy.classList.add(SUB_MENU_TOGGLE_PROXY_CLASS);

  menu.appendChild(subMenu);
  subMenu.appendChild(subMenuToggleProxy);
}

function getMockHeader() {
  return window.document.querySelector(`.${HEADER_CLASS}`);
}

function getMockOutsideHeader() {
  return window.document.querySelector(`.${OUTSIDE_HEADER_CLASS}`);
}

function getMockMenuToggle() {
  return window.document.querySelector(`.${MENU_TOGGLE_CLASS}`);
}

function getMockMenu() {
  return window.document.querySelector(`#${MENU_ID}`);
}

function getMockSubMenuToggle(subMenuToggleID) {
  return window.document.querySelector(`#${subMenuToggleID}`);
}

function getMockSubMenuToggleProxy() {
  return window.document.querySelector(`.${SUB_MENU_TOGGLE_PROXY_CLASS}`);
}

function getMockSubMenu(subMenuID) {
  return window.document.querySelector(`#${subMenuID}`);
}
