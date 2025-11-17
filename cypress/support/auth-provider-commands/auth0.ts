import {BACKEND_URL} from "../../../src/utils/constants";

export function loginViaAuth0Ui(username: string, password: string) {
    const auth0Domain = Cypress.env("VITE_AUTH0_DOMAIN");

    if (!auth0Domain) {
        throw new Error("AUTH0_DOMAIN is missing in Cypress.env");
    }

    // Visit frontend and let it redirect to Auth0
    cy.visit("/");

    // Login on Auth0
    cy.origin(
        `https://${auth0Domain}`,
        { args: { username, password } },
        ({ username, password }) => {
            cy.get('input#username').type(username, {force: true});
            cy.get('input#password').type(password, { log: false, force: true });
            cy.contains('button[value=default]', 'Continue').click({force: true});
        }
    );

    // Verify redirect back to frontend
    cy.url().should("eq", Cypress.config("baseUrl") );
}

export function fakeLoginViaAuth0Ui(username: string, password: string) {

    const RAW_JWT_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFVTUNOWGxqN2pCRmZkWE1MT0dOTSJ9.eyJpc3MiOiJodHRwczovL2Rldi1wMTdoYXByem9uZzA2em93LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2OGYxYWFlMTYwMGVlNWE2ZDhkMzk1MjUiLCJhdWQiOiJodHRwczovL2F1dGgtbWljcm9zZXJ2aWNlL2FwaSIsImlhdCI6MTc2MzQwNzI4MCwiZXhwIjoxNzYzNDkzNjgwLCJzY29wZSI6InJlYWQ6c25pcHBldHMgd3JpdGU6c25pcHBldHMiLCJndHkiOiJwYXNzd29yZCIsImF6cCI6Ikx6VXE2N2YzSWpBeURnM2xjNVBCWnFBTEZYbjRwd0hjIn0.uhJEsXxq45VShwl89JBHGkRXriGJ0lmk_RXdwGfXTWlvqg_xrHlL0wX83nILBMd-wmT2av7paBuUiK4_2AfIH3Aak3Sx89pOSUzjKdH9-z1jrRLHU0q9m1HqF68oAmYUC8ljJx_HwdTjvyT0duq3JVJcOvXS8gLa4N3YzWZBcpMWOT5ojC8BDXmmc4zZx1DrnprFcZMv3wwWEdS0MMA5r0OKyfctdz8B8wmBrRHYqRY3-gUJ7L5zHyBpvja-VSEk3fphDjecwDPXERNNbNlxZp52JS0vm1UQYw8074NO3vOuu0QffDnmftv8Fheu3mS3wyZyEm5sKEH-WxuUjgfGdw";
    if (!RAW_JWT_TOKEN) {
        throw new Error("You must paste a raw JWT in RAW_JWT_TOKEN");
    }

    cy.visit("/", {
        onBeforeLoad(win) {

            win.localStorage.setItem("auth_token", RAW_JWT_TOKEN);
            win.localStorage.setItem("authAccessToken", RAW_JWT_TOKEN);

            win.localStorage.setItem(
                "user",
                JSON.stringify({
                    email: username,
                    name: username.split("@")[0],
                    sub: "auth0|fake-user",
                })
            );
        },
    });

    // Ensure you're logged in
    cy.url().should("eq", Cypress.config("baseUrl") + "");
}

export function authHeaders() {
    const token =
        window.localStorage.getItem("auth_token") ||
        window.localStorage.getItem("authAccessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
}



