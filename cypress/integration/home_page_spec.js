describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    cy.get("#title-writing").should("contain", "cebook");
  });
});
