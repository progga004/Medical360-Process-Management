describe("report bug", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("jorubvit@emda.bi");
    cy.get("#Password").type("password@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Report Bug").click();
  });
  it("should allow filling the form and submitting it", () => {
    cy.get("[name='name']").type("Polly French");
    cy.get("[name='email']").type("orubvit@emda.bi");
    cy.get("[name='phone']").type("123-456-7892");
    cy.get("[name='bug']").type("Page is laggy please fix it");
    cy.get("button").contains("Submit").click();
  });
});


