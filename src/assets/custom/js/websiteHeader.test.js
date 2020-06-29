const { simulatePageLoad } = require("./simulatePageLoad");

require("./websiteHeader");

describe("Website Header", () => {
  describe("When the page loads with a Website Header in the DOM", () => {
    beforeAll(() => {
      const header = window.document.createElement("div");
      header.classList.add("website-header");
      window.document.body.appendChild(header);
      simulatePageLoad();
    });

    it("does not initially add the hidden class to the header", () => {
      const header = window.document.querySelector(".website-header");
      expect(header.classList).not.toContain("website-header--hide");
    });
  });
});
