describe("discharge a patient", () => {
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

  it("allows an admin to discharge the patient", () => {
    // Ensure the table is visible and has at least one entry
    cy.get("table")
      .should("be.visible")
      .find("tr")
      .its("length")
      .should("be.gt", 1);

    // Find the row with a patient whose status is 'Admitted' and click on it
    cy.get("table tbody tr").contains("td", "admitted").scrollIntoView().click();

    // Click on the "Discharge Patient" button
    cy.get("button").contains("Discharge Patient").click();

    // Wait for the modal to appear and then click the 'Discharge' button using both the text and class for specificity
    cy.get("button.bg-red-600").contains("Discharge").should("be.visible").click();
  });
});
