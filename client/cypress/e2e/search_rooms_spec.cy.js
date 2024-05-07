describe('Search Room Page Tests', () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();

    cy.url().should("include", "/resource-management");
    cy.contains("Equipment").click();
    cy.contains("New Equipment").click();
    cy.get('input[name="equipmentName"]').type("ECG Machine 5");
    cy.get('input[name="equipmentType"]').type("ECG Machine");
    cy.get('input[name="quantity"]').type("10");
    cy.get('input[name="location"]').type("ICU Storage");
    cy.get('select[name="maintenanceStatus"]').should("be.visible").select("Operational");
    cy.get("button").contains("Create Equipment").click();
    cy.visit( "/resource-management");
    cy.contains("Rooms").click();
    cy.contains("New Room").click();
  });

  it('allows users to filter rooms', () => {
    cy.get("#roomNumber").type("227");
    cy.get("#roomType").type("VIP");
    cy.get(".select__input").click();
    cy.contains(".select__option", "ECG Machine 5").click();
    cy.get("body").click(0, 0);
    cy.get("#availabilityStatus").should("be.visible").select("Available");

    cy.get("button").contains("Create Room").click();
    cy.visit("/all-rooms");

    cy.get('input[data-cy=search-bar]').should('be.visible');
    cy.get('[data-cy=search-button]').should('be.visible');

    cy.get('input[data-cy=search-bar]').type('227');

    cy.get('[data-cy=search-button]').click();

    cy.url().should('include', '/all-rooms');

   
    cy.get('[data-cy^="room-"]').should('have.length', 1);
    cy.get('[data-cy^="room-"]').first().should('contain', '22');

   
    cy.get('[data-cy^="room-"]').should('not.contain', '102');
    cy.get('[data-cy^="room-"]').should('not.contain', '103');
  });

 
});