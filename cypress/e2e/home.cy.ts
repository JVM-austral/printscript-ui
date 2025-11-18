import {CreateSnippet} from "../../src/types/snippetType";
import {authHeaders} from "../support/auth-provider-commands/auth0";

describe('Home', () => {
  beforeEach(() => {
    const auth0_username = Cypress.env("AUTH0_USERNAME");
    const auth0_password = Cypress.env("AUTH0_PASSWORD");
    cy.loginToAuth0(
        auth0_username,
        auth0_password
    )
  })
  it('Renders home', () => {
    const FRONTEND_URL = Cypress.env("FRONTEND_URL");
    cy.visit(FRONTEND_URL)
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiTypography-h6').should('have.text', 'Printscript');
    cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').should('be.visible');
    cy.get('.css-9jay18 > .MuiButton-root').should('be.visible');
    cy.get('.css-jie5ja').click();
    /* ==== End Cypress Studio ==== */
  })

  // You need to have at least 1 snippet in your DB for this test to pass
  it('Renders the first snippets', () => {
    const FRONTEND_URL = Cypress.env("FRONTEND_URL");
    cy.visit(FRONTEND_URL)
    const first10Snippets = cy.get('[data-testid="snippet-row"]')

    first10Snippets.should('have.length.greaterThan', 0)

    first10Snippets.should('have.length.lessThan', 11)
  })

  it('Can creat snippet find snippets by name', () => {
    const BACKEND_URL = Cypress.env("VITE_API_URL");
    const FRONTEND_URL = Cypress.env("FRONTEND_URL");
    cy.visit(FRONTEND_URL)
    const snippetData: CreateSnippet = {
      name: "Test name",
      snippet: "println(1);",
      language: "PRINTSCRIPT",
      description: "Some description",
      version: "V2"
    }

    cy.intercept('GET', BACKEND_URL+"/snippet-manager/snippets**", (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200);
      });
    }).as('getSnippets');

    cy.request({
      method: 'POST',
      url: BACKEND_URL+'/snippet-manager/snippets', // Adjust if you have a different base URL configured in Cypress
      body: snippetData,
      headers: authHeaders(),
      failOnStatusCode: false // Optional: set to true if you want the test to fail on non-2xx status codes
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.name).to.eq(snippetData.name)
      expect(response.body.description).to.eq(snippetData.description)
      expect(response.body.language).to.eq(snippetData.language)
      expect(response.body).to.haveOwnProperty("id")

      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').clear();
      cy.get('.MuiBox-root > .MuiInputBase-root > .MuiInputBase-input').type(snippetData.name + "{enter}");

      cy.wait("@getSnippets")
      cy.contains(snippetData.name).should('exist');
    })
  })
})
