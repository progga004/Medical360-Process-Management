describe('Search User Page Tests', () => {
    beforeEach(() => {
      cy.visit("/login");
      cy.get("#Email").type("admin@example.com");
      cy.get("#Password").type("admin@123");
      cy.get("button").contains("Login").click();
  
      cy.url().should("include", "/apppage");
      cy.contains("Resource Management").click();
  
      cy.url().should("include", "/resource-management");
      cy.contains("Users").click();
    });
  
    it('allows admin to filter a user', () => {
      cy.get('input[data-cy=search-bar]').should('be.visible');
      cy.get('[data-cy=search-button]').should('be.visible');
  
      cy.get('input[data-cy=search-bar]').type('Barry Campbell');
  
      cy.get('[data-cy=search-button]').click();
  
      cy.url().should('include', '/all-users'); 
    });
  
   
  });