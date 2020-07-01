const { simulatePageLoad } = require("./simulatePageLoad");

require("./externalLinks.js");

const addLink = ({ href, id, target }) => {
  const link = window.document.createElement("a");
  link.id = id;
  link.href = href;
  if (target) {
    link.target = target;
  }
  window.document.body.append(link);
};

const $ = (selector) => window.document.querySelector(selector);

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
    addLink({
      href: "https://another.com",
      id: "linkWithExistingTarget",
      target: "_parent",
    });
    addLink({
      href: "https://another.com",
      id: "linkWithNoRel",
      target: "_blank",
    });
    simulatePageLoad();
  });

  it(`external links open in new tabs`, () => {
    expect($("#externalLink1").target).toBe("_blank");
    expect($("#externalLink2").target).toBe("_blank");
  });

  it(`internal links open in the same tab`, () => {
    expect($("#linkToOurWebsite").target).not.toBe("_blank");
    expect($("#internalAnchor").target).not.toBe("_blank");
  });

  it(`links that have a target defined are not changed`, () => {
    expect($("#linkWithExistingTarget").target).toBe("_parent");
  });

  it(`links that open in new tabs are given the "noopener" rel`, () => {
    expect($("#linkWithNoRel").rel).toBe("noopener noreferrer");
  });
});
