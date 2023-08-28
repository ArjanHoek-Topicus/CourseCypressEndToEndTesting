/// <reference types="Cypress" />

describe("tasks page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        // This line not only makes sure to visit the page, the test will even fail if the page does not exist
    });

    it("should render the main image", () => {
        cy.get(".main-header img").should("have.length", 1);

        cy.get(".main-header").find("img").should("have.length", 1);
        // The find() method will find all elements inside of the element previously acquired by the get() method
    });

    it("should display the page title", () => {
        cy.get(".main-header h1").should((el) => {
            expect(el).to.have.length(1);
            expect(el).to.have.text("My Cypress Course Tasks");
        });
        // Pass a callback function to the should() method to add multiple assertions to the same element
    });
});
