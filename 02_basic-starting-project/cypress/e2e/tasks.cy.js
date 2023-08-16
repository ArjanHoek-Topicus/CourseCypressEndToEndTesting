/// <reference types="Cypress" />

import { dataAttr } from "../helpers";

const mockTask = {
    title: "Test Task Title",
    summary: "Test Task Summary",
};

describe("tasks management", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        openModal();
        checkModalOpen();
    });

    afterEach(() => checkModalClosed());

    it("should close by clicking backdrop", () => {
        cy.get(".backdrop").click({ force: true });
    });

    it("should close by clicking cancel button", () => {
        cy.get(dataAttr("modal-cancel-task-button")).click();
    });

    it("should create a new task", () => {
        cy.get("#title")
            .type(mockTask.title)
            .get("#summary")
            .type(mockTask.summary);
        addTask()
            .get(".task-list .task")
            .should("have.length", 1)
            .get(".task-list .task h2")
            .should("have.text", mockTask.title)
            .get(".task-list .task p")
            .should("have.text", mockTask.summary);
    });

    it("should show error message when input is incomplete", () => {
        cy.get("#title").type(mockTask.title);
        addTask()
            .get("#new-task-form .error-message")
            .should(
                "have.text",
                "Please provide values for task title, summary and category!"
            )
            .get(dataAttr("modal-cancel-task-button"))
            .click();
    });

    it("should filter tasks", () => {
        cy.get("#title")
            .type("Moderate Task Title")
            .get("#summary")
            .type("Moderate Task Summary");

        addTask().get(".task-list .task").should("have.length", 1);

        openModal()
            .get("#title")
            .type("Important Task Title")
            .get("#summary")
            .type("Important Task Summary")
            .get("#category")
            .select("important");

        addTask()
            .get(".task-list .task")
            .should("have.length", 2)
            .get("#task-control #filter")
            .select("important")
            .get(".task-list .task")
            .should("have.length", 1)
            .get("#task-control #filter")
            .select("low")
            .get(".task-list .task")
            .should("have.length", 0)
            .get(".no-tasks")
            .should("exist");
    });

    it("should add multiple tasks", () => {
        cy.get("#title")
            .type("First Task Title")
            .get("#summary")
            .type("First Task Summary");

        addTask().get(".task-list .task").should("have.length", 1);

        openModal()
            .get("#title")
            .type("Second Task Title")
            .get("#summary")
            .type("Second Task Summary");

        addTask()
            .get(".task-list .task")
            .should("have.length", 2)
            .get(".task-list .task")
            .first()
            .contains("First")
            .get(".task-list .task")
            .eq(1)
            .contains("Second");
    });
});

const openModal = () => cy.get(dataAttr("start-add-task-button")).click();

const addTask = () => cy.get(dataAttr("modal-add-task-button")).click();

const checkModalOpen = () =>
    cy.get(".backdrop").should("exist").get(".modal").should("exist");

const checkModalClosed = () =>
    cy.get(".backdrop").should("not.exist").get(".modal").should("not.exist");
