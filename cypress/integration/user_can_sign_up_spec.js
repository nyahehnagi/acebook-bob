describe("Registration", () => {
  it("A user signs up and is redirected to sign in", () => {
    // sign up
    cy.visit("/");
    cy.get("#signup").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("someone123");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("A user signs up with an already registered email address", () => {
    // sign up
    cy.signUp();
    //cy.get('#logout').click();

    cy.signUp().should((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.contain("Email someone@example.com already registered for Acebook-Makerverse")
    });

  });
});
