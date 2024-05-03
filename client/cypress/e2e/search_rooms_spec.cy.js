describe('Search Room Page Tests', () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();

    cy.url().should("include", "/resource-management");
    cy.contains("Rooms").click();
  });

  it('allows users to filter rooms', () => {
    cy.get('input[data-cy=search-bar]').should('be.visible');
    cy.get('[data-cy=search-button]').should('be.visible');

    cy.get('input[data-cy=search-bar]').type('22');

    cy.get('[data-cy=search-button]').click();

    cy.url().should('include', '/all-rooms');

   
    cy.get('[data-cy^="room-"]').should('have.length', 1);
    cy.get('[data-cy^="room-"]').first().should('contain', '22');

   
    cy.get('[data-cy^="room-"]').should('not.contain', '102');
    cy.get('[data-cy^="room-"]').should('not.contain', '103');
  });

 
});