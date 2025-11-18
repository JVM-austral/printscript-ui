
describe('Protected routes test', () => {
  it('should redirect to login when accessing a protected route unauthenticated', () => {
    // Visit the protected route
    cy.visit('/');

    cy.wait(2000)
    cy.origin('https://dev-p17haprzong06zow.us.auth0.com/', () => {

      cy.contains('Log in to dev-p17haprzong06zow to continue to Snippet Searcher App').should('exist');

      cy.url().should('include', 'auth0.com');
    });
  });

  it('should display login content', () => {
    // Visit the login page
    cy.visit('/');

      cy.origin('https://dev-p17haprzong06zow.us.auth0.com/', () => {

          cy.contains('Continue').should('exist');

          cy.contains('Email address').should('exist');

          cy.contains('Password').should('exist');
      });
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
