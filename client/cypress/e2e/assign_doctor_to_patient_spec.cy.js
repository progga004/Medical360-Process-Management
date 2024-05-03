describe("Assign a doctor to patient", () => {
    beforeEach(() => {
      cy.visit("/login");
      cy.get("#Email").type("admin@example.com");
      cy.get("#Password").type("admin@123");
      cy.get("button").contains("Login").click();
  
      cy.url().should("include", "/apppage");
      cy.contains("Resource Management").click();
  
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
  
      // Find the row with a patient whose status is 'Admitted' and click on it
      cy.get("table tbody tr td").contains("admitted").parents("tr").within(() => {
        cy.get("td").eq(1).click(); // Adjust the index if the clickable cell is not the second one
      });
  
      // Click the button to assign a doctor
      cy.get("button").contains("Assign Doctor").click();
  
      // Fetch all doctors listed and select one randomly
      cy.get("li").then($lis => {
        const randomIndex = Math.floor(Math.random() * $lis.length);
        cy.wrap($lis).eq(randomIndex).click();
      });
    });
  });
  