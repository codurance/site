describe("Website Header", () => {
  beforeEach(() => {
    const header = window.document.createElement("div");
    header.classList.add("website-header");
    document.body.appendChild(header);
  });

  it("does not initially add the hidden class to the header", () => {
    const header = window.document.querySelector(".website-header");

    expect(header.classList).not.toContain("website-header--hide");
  });
});
