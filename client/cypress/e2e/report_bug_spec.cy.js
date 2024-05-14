describe("report bug", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("jces@diwe.cl");
    cy.get("#Password").type("password@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Report Bug").click();
  });
  it("should allow filling the form and submitting it", () => {
    cy.get("[name='name']").type("Alice Collier");
    cy.get("[name='email']").type("ces@diwe.cl");
    cy.get("[name='phone']").type("(637) 616-2019");
    cy.get("[name='bug']").type("Page is laggy please fix it");
    cy.get("button").contains("Submit").click();
  });
});


