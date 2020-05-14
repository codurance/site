require("./externalLinks.js");

const simulatePageLoad = () => {
  var DOMContentLoaded_event = document.createEvent("Event");
  DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
  window.document.dispatchEvent(DOMContentLoaded_event);
};

describe("External Links", () => {
  describe("When the page loads with two external links", () => {
    beforeEach(() => {
      const externalLink1 = window.document.createElement("a");
      externalLink1.id = "link1";
      externalLink1.href = "https://test.com";
      const externalLink2 = window.document.createElement("a");
      externalLink2.id = "link2";
      externalLink2.href = "https://another.com";
      window.document.body.append(externalLink1);
      window.document.body.append(externalLink2);
      simulatePageLoad();
    });

    it(`ensures both links open in new tabs`, () => {
      const link1 = window.document.querySelector("#link1");
      expect(link1.target).toBe("_blank");
      const link2 = window.document.querySelector("#link2");
      expect(link2.target).toBe("_blank");
    });
  });
});
