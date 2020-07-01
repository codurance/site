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
  describe("When a page with a Website Header loads", () => {
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

      describe("When we then scroll back up to the original header position", () => {
        beforeEach(() => {
          simulateScrollingToY(headerHeight - 1);
        });

        it("the hidden class is no longer applied", () => {
          expect(header.classList).toContain("website-header");
          expect(header.classList).not.toContain("website-header--hidden");
          expect(header.classList.length).toBe(1);
        });
      });
    });

    describe("When we scroll up the page and are still a long way from the original header position", () => {
      beforeEach(() => {
        simulateScrollingToY(1000);
        simulateScrollingToY(1000 - 1);
      });

      it("we reveal the header at the top of the viewport", () => {
        expect(header.classList).toContain("website-header");
        expect(header.classList).toContain("website-header--revealed");
        expect(header.classList.length).toBe(2);
      });

      describe("When we scroll all the way up to the top of the page", () => {
        beforeEach(() => {
          simulateScrollingToY(0);
        });

        it("we let the header return to it's natural position", () => {
          expect(header.classList).toContain("website-header");
          expect(header.classList.length).toBe(1);
        });
      });
    });
  });
});
