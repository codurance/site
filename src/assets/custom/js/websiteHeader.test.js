const { simulatePageLoad } = require('./simulatePageLoad');
require('./websiteHeader');

let header;

jest.useFakeTimers();
const mockRequestAnimationFrame = cb => setTimeout(cb, 0);
const triggerMockRequestAnimationFrame = () => jest.runAllTimers();

const mockCloseSubMenu = jest.fn();

window.__CODURANCE = {
  websiteNavigation: {
    closeOpenSubMenu: mockCloseSubMenu,
  },
};

const mockSpy = jest.spyOn(window.__CODURANCE.websiteNavigation, "closeOpenSubMenu");

describe('Website Header', () => {
  beforeEach(() => {
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(mockRequestAnimationFrame);
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  describe('When a page with a Website Header loads', () => {
    beforeAll(() => {
      createMockHeader();
      simulatePageLoad();
      header = window.document.querySelector('.website-header');
    });

    it("Should be displayed in it's revealed state", () => {
      expect(header.classList).toContain('website-header');
      expect(header.classList).toContain('website-header--revealed');
      expect(header.classList.length).toBe(2);
    });

    describe("Given we have scrolled a long way down the page (and are a long way from the header's natural position)", () => {
      beforeEach(() => {
        simulateScrollingToY(1000);
      });

      it('The header should be hidden', () => {
        expect(header.classList).not.toContain('website-header--revealed');
      });

      describe('When we then scroll up the page by just a couple of pixel', () => {
        beforeEach(() => {
          simulateScrollingBy(-2);
        });

        it("we don't immediately reveal the header", () => {
          expect(header.classList).not.toContain('website-header--revealed');
        });
      });

      describe('When we then scroll up the page by at least three pixels', () => {
        beforeEach(() => {
          simulateScrollingBy(-3);
        });

        it('we reveal the header positioned at the top of the viewport', () => {
          expect(header.classList).toContain('website-header');
          expect(header.classList).toContain('website-header--revealed');
          expect(header.classList.length).toBe(2);
        });

        describe('When we then scroll down the page by three pixels on large and extra large', () => {
          beforeEach(() => {
            simulateScrollingBy(3);
          });

          it('Any sub-menus close', () => {
            expect(header.classList).not.toContain('website-header--open');
            expect(mockSpy).toHaveBeenCalled();
          });

          it('The header is hidden', () => {
            expect(header.classList).not.toContain('website-header--revealed');
          });
        });
      });

      describe('When we then scroll close to the top of the page', () => {
        beforeEach(() => {
          simulateScrollingToY(1);
        });

        it("we let the header return to it's natural position", () => {
          expect(header.classList).toContain('website-header');
          expect(header.classList).toContain('website-header--revealed');
          expect(header.classList.length).toBe(2);
        });

        describe('When we then scroll down the page by a couple of pixels', () => {
          beforeEach(() => {
            simulateScrollingBy(2);
          });

          it("we don't immediately hide the header", () => {
            expect(header.classList).toContain('website-header');
            expect(header.classList).toContain('website-header--revealed');
            expect(header.classList.length).toBe(2);
          });
        });
      });
    });
  });
});

function createMockHeader() {
  const header = window.document.createElement('header');
  header.classList.add('website-header', 'website-header--revealed');
  window.document.body.appendChild(header);
}

function simulateScrollingToY(y) {
  window.scrollY = y;

  window.document.dispatchEvent(
    new Event('scroll', { bubbles: true, cancelable: true })
  );

  triggerMockRequestAnimationFrame();
}

function simulateScrollingBy(diff) {
  window.scrollY = window.scrollY + diff;

  window.document.dispatchEvent(
    new Event('scroll', { bubbles: true, cancelable: true })
  );

  triggerMockRequestAnimationFrame();
}