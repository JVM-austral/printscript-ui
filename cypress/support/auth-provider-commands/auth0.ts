import {BACKEND_URL} from "../../../src/utils/constants";

export function loginViaAuth0Ui(username: string, password: string) {
    const auth0Domain = Cypress.env("AUTH0_DOMAIN");

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
            cy.get('input#username').type(username);
            cy.get('input#password').type(password, { log: false });
            cy.contains('button[value=default]', 'Continue').click();
        }
    );

    // Verify redirect back to frontend
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
}

export function fakeLoginViaAuth0Ui(username: string, password: string) {

    const RAW_JWT_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFVTUNOWGxqN2pCRmZkWE1MT0dOTSJ9.eyJpc3MiOiJodHRwczovL2Rldi1wMTdoYXByem9uZzA2em93LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2OGYxYWFlMTYwMGVlNWE2ZDhkMzk1MjUiLCJhdWQiOiJodHRwczovL2F1dGgtbWljcm9zZXJ2aWNlL2FwaSIsImlhdCI6MTc2MzMyMDY5MywiZXhwIjoxNzYzNDA3MDkzLCJzY29wZSI6InJlYWQ6c25pcHBldHMgd3JpdGU6c25pcHBldHMiLCJndHkiOiJwYXNzd29yZCIsImF6cCI6Ikx6VXE2N2YzSWpBeURnM2xjNVBCWnFBTEZYbjRwd0hjIn0.WmdtDRz1qi3G3yQ7HI9tUBkB8cbJvLGZoIRIdw7I2HCNB_naCBmr-L397wsShYFfqiLnfApb0RsBgYLPpkcL6hOEtIAwxoZ03CrHVRkfIKhQpBhXkGN11KV0NSb7sfUVv9ICDnkx6smhz4tU6K-z9hD7BTFH6edTR7AjfnArX3np1bMqJk-1Mr5nWFH_5kizmlPGYNKtz4KRWKqBKKVswCm6Ucz7e0nTdcPLj8P3BHkkRTVr-ojebrNdeVTge8H-n6r8dHyWubSygt-AgK0Mq2iTGIU2JFajw9JHq8CZk52JPlxfViJoVOFyi9fQfNPlzizj_qQ4qOyQanHbkG2ttQ"
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



