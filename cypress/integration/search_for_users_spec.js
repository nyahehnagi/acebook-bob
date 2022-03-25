
describe("Search for users", () => {
  it('searches for a user ', () => {
    cy.signUp()

    cy.get("#search").type("test");
    cy.get("#search-form").submit();

    cy.url().should("include", "/users");
    cy.get("#user").should("contain", "test name");
  })

  it('searches for a user and finds two matches', () => {
    cy.signUpSecondUser()

    cy.get("#search").type("name");
    cy.get("#search-form").submit();

    cy.url().should("include", "/users");

    cy.get("#users").first().should("contain", "test name");
    cy.get("#users").last().should("contain", "another name");
})

})