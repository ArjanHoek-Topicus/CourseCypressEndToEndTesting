/// <reference types="Cypress" />

describe("Takeaways", () => {
    beforeEach(() => {
        cy.task("seedDatabase");
        cy.visit("/");
    });

    it("should display a list of fetched takeaways", () => {
        cy.get('[data-cy="takeaway-item"]').should((items) => {
            expect(items).length(2);
        });
    });

    it("should add a new takeaway", () => {
        cy.intercept("POST", "/takeaways/new*", "success").as("createTakeaway");

        cy.login();

        cy.contains("+ Add a new takeaway").click();
        cy.get("[data-cy='title']").click();

        cy.get("[data-cy='title']").type("TestTitle1");
        cy.get("[data-cy='body']").type("TestBody1");
        cy.get("[data-cy='create-takeaway']").click();
        cy.wait("@createTakeaway")
            .its("request.body")
            .should("match", /TestTitle1.*TestBody1*/);
    });
});
