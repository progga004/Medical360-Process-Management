describe("Equipment Deletion Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();
    cy.contains("Equipment").click();
  });

  it('allows an admin to delete the first listed room and verify it is removed', () => {
    cy.get("table").should("be.visible");

    
    cy.get("td").first().invoke('text').then((equipmentName) => {
      cy.get("td").first().parents("tr").within(() => {
        cy.get("button").contains("Delete").click();
      });
      cy.get("button.bg-red-600").should("be.visible").click();
    
      // Custom polling logic to wait for an element to disappear
      function verifyDeletion() {
        cy.get('body').then($body => {
          if ($body.find(`td:contains('${equipmentName.trim()}')`).length > 0) {
            // If the element is still found, wait for some time and try again
            cy.wait(500); // Wait for 500ms
            verifyDeletion(); // Recursively call to check again
          }
        });
      }
    
      verifyDeletion(); // Call the function initially
    });
    
    
  });
});