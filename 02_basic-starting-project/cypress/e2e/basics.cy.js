/// <reference types="Cypress" />

describe("tasks page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
    });

    it("should render the main image", () => {
        cy.get(".main-header img").should("exist");
        // cy.get(".main-header").find("img").should("exist");
    });

    it("should display the page title", () => {
        cy.get("h1").should("have.length", 1);
        cy.get("h1").contains("My Cypress Course Tasks");
    });
});
