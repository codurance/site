const { simulatePageLoad } = require("./simulatePageLoad");

require("./websiteHeader");

const headerHeight = 100;

const arrangeMockHeader = () => {
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    value: headerHeight,
  });

  const header = window.document.createElement("header");
  header.classList.add("website-header");
  window.document.body.appendChild(header);
};

let header;

describe("Website Header", () => {
  describe("When the page loads with a Website Header in the DOM", () => {
    beforeAll(() => {
      arrangeMockHeader();
      simulatePageLoad();
      header = window.document.querySelector(".website-header");
    });

    it("does NOT hide the header", () => {
      expect(header.classList).not.toContain("website-header--hide");
    });

    describe("When the window is scrolled by less than the height of the header", () => {
      beforeEach(() => {
        window.scrollY = headerHeight - 1;
        window.document.dispatchEvent(
          new Event("scroll", { bubbles: true, cancelable: true })
        );
      });

      it("does NOT hide the header", () => {
        expect(header.classList).not.toContain("website-header--hide");
      });
    });

    describe("When the window is scrolled by the height of the header", () => {
      beforeEach(() => {
        window.scrollY = headerHeight;
        window.document.dispatchEvent(
          new Event("scroll", { bubbles: true, cancelable: true })
        );
      });

      it("does hide the header", () => {
        expect(header.classList).toContain("website-header--hide");
      });
    });
  });
});
