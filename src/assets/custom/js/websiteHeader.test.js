const { simulatePageLoad } = require("./simulatePageLoad");
require("./websiteHeader");

let header;

jest.useFakeTimers();
const mockRequestAnimationFrame = (cb) => setTimeout(cb, 0);

describe("Website Header", () => {
  beforeEach(() => {
    jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(mockRequestAnimationFrame);
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  describe("When a page with a Website Header loads", () => {
    beforeAll(() => {
      createMockHeader();
      simulatePageLoad();
      header = window.document.querySelector(".website-header");
    });

    it("no special classes are applied", () => {
      expect(header.classList).toContain("website-header");
      expect(header.classList.length).toBe(1);
    });

    describe("Given we have scrolled a long way down the page (and are a long way from the header's natural position)", () => {
      beforeEach(() => {
        simulateScrollingToY(1000);
      });

      describe("When we then scroll up the page by just a couple of pixel", () => {
        beforeEach(() => {
          simulateScrollingToY(1000 - 2);
        });

        it("we don't immediately reveal the header", () => {
          expect(header.classList).toContain("website-header");
          expect(header.classList).not.toContain("website-header--revealed");
          expect(header.classList.length).toBe(1);
        });
      });

      describe("When we then scroll up the page by at least three pixels", () => {
        beforeEach(() => {
          simulateScrollingToY(1000 - 3);
        });

        it("we reveal the header positioned at the top of the viewport", () => {
          expect(header.classList).toContain("website-header");
          expect(header.classList).toContain("website-header--revealed");
          expect(header.classList.length).toBe(2);
        });

        describe("When we then scroll all the way up to the top of the page", () => {
          beforeEach(() => {
            simulateScrollingToY(0);
          });

          it("we let the header return to it's natural position", () => {
            expect(header.classList).toContain("website-header");
            expect(header.classList.length).toBe(1);
          });
        });

        describe("When we then scroll down the page by a couple of pixels", () => {
          beforeEach(() => {
            simulateScrollingToY(1000 - 1);
          });

          it("we don't immediately hide the header", () => {
            expect(header.classList).toContain("website-header");
            expect(header.classList).toContain("website-header--revealed");
            expect(header.classList.length).toBe(2);
          });
        });

        describe("When we then scroll down the page by three pixels", () => {
          beforeEach(() => {
            simulateScrollingToY(1000);
          });

          it("we let the header return to it's natural position", () => {
            expect(header.classList).toContain("website-header");
            expect(header.classList.length).toBe(1);
          });
        });
      });
    });
  });
});

function createMockHeader() {
  const header = window.document.createElement("header");
  header.classList.add("website-header");
  window.document.body.appendChild(header);
}

function simulateScrollingToY(y) {
  window.scrollY = y;

  window.document.dispatchEvent(
    new Event("scroll", { bubbles: true, cancelable: true })
  );

  jest.runAllTimers();
}
