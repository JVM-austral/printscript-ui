import {BACKEND_URL} from "../../src/utils/constants";

describe('Add snippet tests', () => {
  beforeEach(() => {
    const auth0_username = Cypress.env("AUTH0_USERNAME");
    const auth0_password = Cypress.env("AUTH0_PASSWORD");
    cy.loginToAuth0(
        auth0_username,
        auth0_password
    )
  })
  it('Can add snippets manually', () => {
    cy.visit("/")
    cy.intercept('POST', BACKEND_URL+"/snippet-manager/snippets", (req) => {
      req.reply((res) => {
        expect(res.body).to.include.keys("id","name","version","language")
        expect(res.statusCode).to.eq(200);
      });
    }).as('postRequest');

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-9jay18 > .MuiButton-root').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#name').type('Some snippet name');
    cy.get('#demo-simple-select').click()
    cy.get('[data-testid="menu-option-PrintScript"]').click()

    cy.get('[data-testid="add-snippet-code-editor"]').click();
    cy.get('[data-testid="add-snippet-code-editor"]').type(`const snippet: string = "some snippet"; \n println(snippet);`);
    cy.get('[data-testid="SaveIcon"]').click();

    cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
  })

  it('Can add snippets via file', () => {
    cy.visit("/")
    cy.intercept('POST', BACKEND_URL+"/snippet-manager/snippets", (req) => {
      req.reply((res) => {
        expect(res.body).to.include.keys("id","name","version","language")
        expect(res.statusCode).to.eq(200);
      });
    }).as('postRequest');

    cy.intercept('GET', BACKEND_URL+'/snippet-manager/snippets/languages', (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200);
      })}).as('getLanguages');
    +
    cy.wait('@getLanguages').its('response.statusCode').should('eq', 200);
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid="upload-file-input"').selectFile("cypress/fixtures/example_ps.ps", {force: true})

    cy.get('[data-testid="SaveIcon"]').click();

    cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
  })
})
