/// <reference types="Cypress" />

describe("contact form", () => {
    beforeEach(() => {
        cy.visit("/").clickElement('[data-cy="header-about-link"]');
    });

    it("should submit the form by clicking submit button", () => {
        cy.typeInElement(
            '[data-cy="contact-input-message"]',
            "This is a test message"
        )
            .typeInElement('[data-cy="contact-input-name"]', "John Doe")
            .typeInElement('[data-cy="contact-input-email"]', "john@doe.com")
            .clickElement('[data-cy="contact-btn-submit"]')
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
        cy.typeInElement(
            '[data-cy="contact-input-message"]',
            "This is a test message"
        )
            .typeInElement('[data-cy="contact-input-name"]', "John Doe")
            .typeInElement(
                '[data-cy="contact-input-email"]',
                "john@doe.com{enter}"
            )
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
        cy.get('[data-cy="contact-input-message"]')
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
            .clickElement('[data-cy="contact-btn-submit"]')
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
