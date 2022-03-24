//const { json } = require("express/lib/response");

describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    
    cy.signUp()

    // submit a post
    cy.visit("/posts");
    // cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#submit").click();

    cy.get("#posts").should("contain", "Hello, world!");
    cy.get("#posted-by-link").should("contain", "test name");

    // Extract date/time from page in variable
    cy.get('#createdAt').then(($createdAt) => {
      const timeSincePosted = parseInt($createdAt.text().slice(0, -1));
      // Check if less than 10 seconds
      cy.wrap(timeSincePosted).should('be.lt', 10);
    });

  });

  it("Can view profile from a post", () => {
    cy.signUp()

    cy.visit("/posts");
    // cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#submit").click();
    cy.get('#posted-by-link').eq(0).click()

    cy.get("#profile").should("contain", "test name");
  })
});
