// describe("give feedback", () => {
//     beforeEach(() => {
//       cy.visit("/login");
//       cy.get("#Email").type("otdijke@samlih.tk");
//       cy.get("#Password").type("password@123");
//       cy.get("button").contains("Login").click();
  
//       cy.url().should("include", "/apppage");
//       cy.contains("Give Feedback").click();
  
      
//     });
//     it("should allow filling the form and submitting it", () => {
//       cy.get("[name='name']").type("Bary Campbell");
//       cy.get("[name='email']").type("otdijke@samlih.tk");
//         // Click on the third star for the rating
//     cy.get(".text-gray-400").eq(4).click();
//       cy.get("[name='comments']").type("This page is great");
  
//       cy.get("button").contains("Submit").click();
//     });
//   });
  