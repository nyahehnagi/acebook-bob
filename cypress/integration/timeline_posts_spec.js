//const { json } = require("express/lib/response");

describe("Timeline", () => {
  it("can submit posts, when signed in, and view them", () => {
    // sign up
    
    cy.signUp()

    // submit a post
    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    cy.get("#posts").should("contain", "Hello, world!");
    cy.get("#postedBy").should("contain", "test name");

    // 1. Extract date/time from page in variable
    cy.get('#createdAt').then(($createdAt) => {
      const timeSincePosted = parseInt($createdAt.text().slice(0, -1));
      // 5. Check if less than 50 seconds
      cy.wrap(timeSincePosted).should('be.lt', 5);
    });

  });

  it("Can view profile from a post", () => {
    cy.signUp()

    cy.visit("/posts");
    cy.contains("New post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();
    cy.get('#postedByLink').eq(0).click()

    cy.get("#profile").should("contain", "test name");
  })
});
