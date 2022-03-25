describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get("#navbar-title").should("contain", "cebook");
  });
});
