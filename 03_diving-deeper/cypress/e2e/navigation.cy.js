/// <reference types="Cypress" />

describe("page navigation", () => {
    it("should navigate between pages", () => {
        cy.visit("/")
            .task("test", "testText")
            .then((testValue) => {
                expect(testValue).to.equal("testText");
            })
            .getByData("header-about-link")
            .click()
            .location("pathname")
            .should("equal", "/about")
            .go("back")
            .location("pathname")
            .should("equal", "/")
            .go("forward")
            .location("pathname")
            .should("equal", "/about")
            .getByData("header-home-link")
            .click()
            .location("pathname")
            .should("equal", "/");
    });
});
