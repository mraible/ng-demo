declare namespace Cypress {
  interface Chainable {
    signIn(): Chainable<void>;
  }
}

Cypress.Commands.add('signIn', () => {
  cy.env(['E2E_DOMAIN']).then(({E2E_DOMAIN}) => {
    cy.origin(E2E_DOMAIN, () => {
      cy.env(['E2E_USERNAME', 'E2E_PASSWORD']).then(({E2E_USERNAME, E2E_PASSWORD}) => {
        cy.get('input[name=username]').type(E2E_USERNAME, {log: false});
        cy.get('input[name=password]').type(`${E2E_PASSWORD}{enter}`, {log: false});
      });
    });
  });
  // Auth0 can take a few seconds to redirect back to your app
  cy.url({timeout: 10000}).should('equal', 'http://localhost:4200/home');
});
