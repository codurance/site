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

const simulateScrollingToY = (y) => {
  window.scrollY = y;
  window.document.dispatchEvent(
    new Event("scroll", { bubbles: true, cancelable: true })
  );
};

let header;

describe("Website Header", () => {
  describe("When the page loads with a Website Header", () => {
    beforeAll(() => {
      arrangeMockHeader();
      simulatePageLoad();
      header = window.document.querySelector(".website-header");
    });

    it("no special classes are applied", () => {
      expect(header.classList).toContain("website-header");
      expect(header.classList.length).toBe(1);
    });

    describe("When we scroll down but not so far the header goes out of view", () => {
      beforeEach(() => {
        simulateScrollingToY(headerHeight - 1);
      });

      it("no special classes are applied", () => {
        expect(header.classList).toContain("website-header");
        expect(header.classList.length).toBe(1);
      });
    });

    describe("When we scroll down so far the header goes out of view", () => {
      beforeEach(() => {
        simulateScrollingToY(headerHeight);
      });

      it("a special class is applied to hide the header", () => {
        expect(header.classList).toContain("website-header");
        expect(header.classList).toContain("website-header--hidden");
        expect(header.classList.length).toBe(2);
      });
    });
  });
});
