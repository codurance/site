require("./externalLinks.js");

const simulatePageLoad = () => {
  var DOMContentLoaded_event = document.createEvent("Event");
  DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
  window.document.dispatchEvent(DOMContentLoaded_event);
};

describe("External Links", () => {
  describe("When the page loads with external links", () => {
    beforeEach(() => {
      const externalLink = window.document.createElement("a");
      externalLink.href = "https://test.com";
      window.document.body.append(externalLink);
      simulatePageLoad();
    });

    it(`should ensure the link opens in a new tab`, () => {
      const link = window.document.querySelector("a");
      expect(link.target).toBe("_blank");
    });
  });
});
