declare namespace Cypress {
  interface Chainable {
    signIn(): Chainable<void>;
  }
}

Cypress.Commands.add('signIn', () => {
  // Log in once and reuse the session in every test, so the tests send fewer requests to Auth0
  cy.session('auth0', () => {
    cy.intercept('POST', '**/oauth/token').as('token');
    cy.visit('/');
    cy.get('#login').click();
    cy.env(['E2E_DOMAIN']).then(({E2E_DOMAIN}) => {
      cy.origin(E2E_DOMAIN, () => {
        cy.env(['E2E_USERNAME', 'E2E_PASSWORD']).then(({E2E_USERNAME, E2E_PASSWORD}) => {
          cy.get('input[name=username]').type(E2E_USERNAME, {log: false});
          cy.get('input[name=password]').type(`${E2E_PASSWORD}{enter}`, {log: false});
        });
      });
    });
    // The app goes to /home even if getting tokens fails, so check the token response and the Logout button
    cy.wait('@token', {timeout: 10000}).its('response.statusCode').should('equal', 200);
    cy.get('#logout').should('exist');
  }, {cacheAcrossSpecs: true});
});
