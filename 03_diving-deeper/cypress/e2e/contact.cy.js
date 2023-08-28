/// <reference types="Cypress" />

describe("contact form", () => {
    it("should submit the form by clicking submit button", () => {
        cy.visit("http://localhost:5173/")
            .get('[data-cy="header-about-link"]')
            .click()
            .get('[data-cy="contact-input-message"]')
            .type("This is a test message")
            .get('[data-cy="contact-input-name"]')
            .type("John Doe")
            .get('[data-cy="contact-input-email"]')
            .type("john@doe.com")
            .get('[data-cy="contact-btn-submit"]')
            .should((el) => {
                expect(el).enabled;
                expect(el).text("Send Message");
            })
            .click()
            .should((el) => {
                expect(el).disabled;
                expect(el).text("Sending...");
            })
            .wait(1000)
            .should((el) => {
                expect(el).enabled;
                expect(el).text("Send Message");
            });
    });

    it("should submit the form by hitting enter", () => {
        cy.visit("http://localhost:5173/")
            .get('[data-cy="header-about-link"]')
            .click()
            .get('[data-cy="contact-input-message"]')
            .type("This is a test message")
            .get('[data-cy="contact-input-name"]')
            .type("John Doe")
            .get('[data-cy="contact-input-email"]')
            .type("john@doe.com{enter}")
            .get('[data-cy="contact-btn-submit"]')
            .should((el) => {
                expect(el).disabled;
                expect(el).text("Sending...");
            })
            .wait(1000)
            .should((el) => {
                expect(el).enabled;
                expect(el).text("Send Message");
            });
    });

    it("should display input field as invalid", () => {
        cy.visit("http://localhost:5173/")
            .get('[data-cy="header-about-link"]')
            .click()
            .get('[data-cy="contact-input-message"]')
            .as("msg")
            .focus()
            .get('[data-cy="contact-input-name"]')
            .focus()
            .get("@msg")
            .should((el) => {
                expect(el).css("border-color", "rgb(255, 102, 208)");
            })
            .parent()
            .should("have.attr", "class")
            .and("match", /invalid/)
            .get('[data-cy="contact-btn-submit"]')
            .click()
            .then((el) => {
                expect(el).not.disabled;
                expect(el).not.text("Sending...");
            })
            // Use then() to avoid rerunning callback until no assertions throw within it before timeout
            .get("@msg")
            .should((el) => {
                expect(el).focus;
            });
    });
});
