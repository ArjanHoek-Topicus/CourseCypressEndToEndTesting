/// <reference types="Cypress" />

describe("page navigation", () => {
    it("should navigate between pages", () => {
        cy.visit("http://localhost:5173/")
            .get('[data-cy="header-about-link"]')
            .click()
            .location("pathname")
            .should("equal", "/about")
            .go("back")
            .location("pathname")
            .should("equal", "/")
            .go("forward")
            .location("pathname")
            .should("equal", "/about")
            .get('[data-cy="header-home-link"]')
            .click()
            .location("pathname")
            .should("equal", "/");
    });
});
