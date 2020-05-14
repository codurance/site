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
  beforeEach(() => {
    addLink({
      href: "https://external.com",
      id: "externalLink1",
    });
    addLink({
      href: "http://our-site.com/",
      id: "linkToOurWebsite",
    });
    addLink({
      href: "#internal-anchor",
      id: "internalAnchor",
    });
    addLink({
      href: "https://another.com",
      id: "externalLink2",
    });
    simulatePageLoad();
  });

  it(`ensures external links open in new tabs and internal ones don't`, () => {
    const $ = (selector) => window.document.querySelector(selector);
    expect($("#externalLink1").target).toBe("_blank");
    expect($("#externalLink2").target).toBe("_blank");
    expect($("#linkToOurWebsite").target).not.toBe("_blank");
    expect($("#internalAnchor").target).not.toBe("_blank");
  });
});
