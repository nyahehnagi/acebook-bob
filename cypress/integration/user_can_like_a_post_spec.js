  describe("liking a post", () => {
    xit('user likes a post', () => { 
    
    cy.signUp()
    // cy.contains("New post").click();
    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#submit").click();

    cy.get("#likeForm").submit();
    cy.get("#numberOfLikes").should("contain", "1");
    })
  })
