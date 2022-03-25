describe("Add Friend", () => {
  it('user can add friend from the profile page', () => {
      cy.signUp()

      // cy.contains("New post").click();
      cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
      cy.get("#submit").click();
  
      // Sign another user up
      cy.signUpSecondUser()

      cy.get("#posted-by-link").first().click();

      cy.get("#add-friend").should("have.attr", 'value',  "Add Friend");
  
  })

  it('user can not add themself as a friend', () => {
    cy.signUp();
    cy.get("#view-profile").click();
    cy.get('#add-friend').should('not.exist');
  })

  it('user can not add a friend if friends already', () => {
    cy.signUp()

    // cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#submit").click();

    // Sign another user up
    cy.signUpSecondUser()

    cy.get("#posted-by-link").first().click();
    cy.get("#add-friend-form").submit();
    cy.get('#add-friend-form').should('not.exist');

})

})