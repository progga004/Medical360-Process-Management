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

    // Click the row to view patient info
    cy.get("table tbody tr")
      .eq(1)
      .within(() => {
        cy.get("td").eq(1).click();
      });

    cy.get("button").contains("Discharge Patient").click();

     cy.get("button.bg-red-600").should("be.visible").click();
  });
});
