describe("New Equipment Page Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();
    cy.contains("Equipment").click();
    cy.contains("New Equipment").click();
  });
  it("should allow filling the form and submitting it", () => {
    cy.get('input[name="equipmentName"]').type("Fetal Doppler 5");
    cy.get('input[name="equipmentType"]').type("Fetal Doppler");
    cy.get('input[name="quantity"]').type("4");
    cy.get('input[name="location"]').type("ICU Storage");
    cy.get('select[name="maintenanceStatus"]').should("be.visible").select("Operational");

    cy.get("button").contains("Create Equipment").click();
  });
});
