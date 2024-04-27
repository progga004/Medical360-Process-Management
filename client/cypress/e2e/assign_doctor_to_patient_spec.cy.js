describe("Assign patient to doctor", () => {
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

  it("allows an admin to assign a doctor to a patient", () => {
    // Ensure the table is visible and has at least one entry
    cy.get("table")
      .should("be.visible")
      .find("tr")
      .its("length")
      .should("be.gt", 1);

    // Click the row to view user info
    cy.get("table tbody tr")
      .eq(1)
      .within(() => {
        cy.get("td").eq(1).click();
      });
    cy.get("button").contains("Assign Doctor").click();
    cy.contains("li", "Pauline Bradley").click();
  });
});
