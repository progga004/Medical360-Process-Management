describe('Search Feedback Tests', () => {
    beforeEach(() => {
      cy.visit("/login");
      cy.get("#Email").type("admin@example.com");
      cy.get("#Password").type("admin@123");
      cy.get("button").contains("Login").click();
  
      cy.url().should("include", "/apppage");
      cy.contains("Feedbacks").click();
    });
  
    it('allows admin to filter a bug', () => {
      cy.get('input[data-cy=search-bar]').should('be.visible');
      cy.get('[data-cy=search-button]').should('be.visible');
  
      cy.get('input[data-cy=search-bar]').type('John Doe');
  
      cy.get('[data-cy=search-button]').click();
  
    });
  
   
  });