describe("New User Page Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#Email").type("admin@example.com");
    cy.get("#Password").type("admin@123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/apppage");
    cy.contains("Resource Management").click();

    cy.contains("Users").click();
    cy.contains("New User").click();
  });
  it("should allow filling the form and submitting it", () => {
    cy.get("[name='name']").type("John Doe");
    cy.get("[name='email']").type("johndoe@example.com");
    cy.get("[name='password']").type("password123");
    cy.get("[name='pwConfirm']").type("password123");
    cy.get("[name='phoneNumber']").type("1234567890");

    cy.get("button").contains("Create New User").click();
    cy.visit("/all-users");
  });
});
