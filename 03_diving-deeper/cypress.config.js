import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on("task", {
                test(testValue) {
                    return testValue;
                },
            });
        },
        baseUrl: "http://localhost:5173",
    },
});
