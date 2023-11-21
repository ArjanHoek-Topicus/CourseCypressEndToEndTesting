describe("Auth", () => {
    beforeEach(() => {
        cy.task("seedDatabase");
    });

    it("should signup", () => {
        cy.visit("/signup");

        cy.get("[data-cy='auth-email']").click();
        cy.get("[data-cy='auth-email']").type("test2@example.com");
        cy.get("[data-cy='auth-password']").type("testpassword");
        cy.get("[data-cy='auth-submit']").click();
        cy.location("pathname").should((pathname) => {
            expect(pathname).to.equal("/takeaways");
        });

        cy.getCookie("__session").its("value").should("not.be.empty");
    });

    it("should login", () => {
        cy.login();
    });

    it("should logout", () => {
        cy.login();

        cy.contains("Logout").click();
        cy.location("pathname").should((pathname) => {
            expect(pathname).to.equal("/");
        });

        cy.getCookie("__session").its("value").should("be.empty");
    });
});
