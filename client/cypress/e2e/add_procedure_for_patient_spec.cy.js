describe("view Patient Profile", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource and User Management").click();

    cy.url().should("include", "/resource-management");
    cy.contains("Patients").click();
    cy.url().should("include", "/all-patients");
  });

  it("allows an admin to view a patient with 'Admitted' status", () => {
    // Ensure the table is visible and has at least one entry
    cy.get("table")
      .should("be.visible")
      .find("tr")
      .its("length")
      .should("be.gt", 1);

    // Find the row with a patient whose status is 'Admitted' and click on it
    cy.get("table tbody tr td").contains("admitted").parents("tr").within(() => {
      cy.get("td").eq(1).click(); // Adjust the index if the clickable cell is not the second one
    });

    // Assuming 'Add Procedure' button appears after the patient details are loaded
    cy.get("button").contains("Add Procedure").click();

    // Interacting with input fields for adding a procedure
    cy.get('input[type="text"]').first().type("Knee Surgery");
    cy.get("textarea").type("Perform knee surgery");

    // Submit the procedure addition
    cy.get("button").contains("Add Process").click();
  });
});
