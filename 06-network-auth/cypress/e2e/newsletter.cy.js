describe("Newsletter", () => {
    beforeEach(() => {
        cy.task("seedDatabase");
        cy.visit("/");
    });

    it("should display a success message", () => {
        cy.intercept("POST", "/newsletter*", {
            status: 201,
        }).as("subscribe");
        cy.get("[data-cy='newsletter-email']").type("test1@example.com");
        cy.get("[data-cy='newsletter-submit']").click();
        cy.wait("@subscribe");
        cy.contains("Thanks for signing up!");
    });

    it("should display validation errors", () => {
        cy.intercept("POST", "", {
            message: "This email is already subscribed.",
        }).as("subscribe");

        cy.get("[data-cy='newsletter-email']").type("test3@example.com");
        cy.get("[data-cy='newsletter-submit']").click();

        cy.wait("@subscribe");

        cy.contains("This email is already subscribed.");
    });

    it("should successfully create a new contact", () => {
        cy.request({
            method: "POST",
            url: "/newsletter",
            body: { email: "test4@example.nl" },
            form: true,
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
});
