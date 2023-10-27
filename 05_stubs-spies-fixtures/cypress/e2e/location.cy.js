/// <reference types="cypress" />

describe("share location", () => {
    beforeEach(() => {
        cy.clock();

        cy.fixture("user-location.json").as("userLocation");

        cy.visit("/").then((window) => {
            cy.get("@userLocation").then((fakePosition) => {
                const getCurrentPositionStub = (cb) => {
                    setTimeout(() => cb(fakePosition), 100);
                };

                cy.stub(window.navigator.geolocation, "getCurrentPosition")
                    .callsFake(getCurrentPositionStub)
                    .as("getPosition");
            });

            cy.stub(window.navigator.clipboard, "writeText")
                .as("copy")
                .resolves();

            cy.spy(window.localStorage, "setItem").as("store");
            cy.spy(window.localStorage, "getItem").as("retrieve");
        });

        cy.get('[data-cy="get-loc-btn"]').as("locationBtn");
        cy.get('[data-cy="share-loc-btn"]').as("shareBtn");
    });

    it("should fetch the user location", () => {
        cy.get("@locationBtn").click();
        cy.get("@getPosition").should((fn) => {
            expect(fn).called;
        });

        cy.get("@locationBtn").should((el) => {
            expect(el).disabled;
        });

        cy.get("[data-cy='actions']").should((el) => {
            expect(el).contain("Location fetched");
        });

        cy.get("@shareBtn").click();
        cy.get('[data-cy="error-container"]').contains(
            "Please enter your name and get your location first!"
        );
    });

    it("should share a location URL", () => {
        const name = "John Doe";

        cy.get("@userLocation").then(({ coords: { latitude, longitude } }) => {
            cy.get('[data-cy="name-input"]').type(name);
            cy.get("@locationBtn").click();
            cy.get("@shareBtn").click();

            cy.get('[data-cy="info-message"]').should((el) => {
                expect(el).visible;
            });

            cy.tick(5000);

            cy.get('[data-cy="info-message"]').should((el) => {
                expect(el).not.visible;
            });

            cy.get("@copy").should((fn) =>
                expect(fn).calledWithMatch(
                    new RegExp(`${latitude}.*${longitude}.*${encodeURI(name)}`)
                )
            );

            cy.get("@retrieve").should((fn) => {
                expect(fn).calledWith(name);
                expect(fn).returned(null);
            });

            cy.get("@store").should((fn) => {
                expect(fn).calledWithMatch(
                    name,
                    new RegExp(`${latitude}.*${longitude}.*${encodeURI(name)}`)
                );
            });
        });
    });
});
