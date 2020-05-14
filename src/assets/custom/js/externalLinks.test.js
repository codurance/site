require("./externalLinks.js");

const simulatePageLoad = () => {
  var DOMContentLoaded_event = document.createEvent("Event");
  DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
  window.document.dispatchEvent(DOMContentLoaded_event);
};

const addLink = ({ href, id }) => {
  const link = window.document.createElement("a");
  link.id = id;
  link.href = href;
  window.document.body.append(link);
};

describe("External Links", () => {
  describe("When the page loads with two external links", () => {
    beforeEach(() => {
      addLink({
        href: "https://test.com",
        id: "link1",
      });
      addLink({
        href: "https://another.com",
        id: "link2",
      });
      simulatePageLoad();
    });

    it(`ensures both links open in new tabs`, () => {
      const link1 = window.document.querySelector("#link1");
      expect(link1.target).toBe("_blank");
      const link2 = window.document.querySelector("#link2");
      expect(link2.target).toBe("_blank");
    });
  });

  describe("When the page loads with an internal link", () => {
    beforeEach(() => {
      addLink({
        href: "#internal-anchor",
        id: "internal",
      });
      addLink({
        href: "https://test.com",
        id: "external",
      });
      simulatePageLoad();
    });

    it(`only the external link opens in a new tab`, () => {
      const external = window.document.querySelector("#external");
      expect(external.target).toBe("_blank");
      const internal = window.document.querySelector("#internal");
      expect(internal.target).not.toBe("_blank");
    });
  });
});
