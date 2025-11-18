
describe('Protected routes test', () => {
  it('should redirect to login when accessing a protected route unauthenticated', () => {
    // Visit the protected route
    cy.visit('/');

    cy.wait(2000)

    // Check if the URL is redirected to the login page
    cy.url().should('include', 'dev');
  });

  it('should display login content', () => {
    // Visit the login page
    cy.visit('/');

    // Look for text that is likely to appear on a login page
    cy.contains('continue').should('exist');
    cy.get('input#password').should('exist'); // Adjust the text based on actual content
  });

  it('should not redirect to login when the user is already authenticated', () => {
      const auth0_username = Cypress.env("AUTH0_USERNAME");
      const auth0_password = Cypress.env("AUTH0_PASSWORD");
      cy.loginToAuth0(
          auth0_username,
          auth0_password
      )


    cy.visit('/');

    cy.wait(1000)

    // Check if the URL is redirected to the login page
    cy.url().should('not.include', '/login');
  });

})
