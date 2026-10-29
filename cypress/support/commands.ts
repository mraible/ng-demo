// Sign in on Auth0's login page, which Cypress reaches with cy.origin().
// Cypress 16 reads secrets with cy.env() (Cypress.env() is gone): set E2E_DOMAIN, E2E_USERNAME and
// E2E_PASSWORD in cypress.env.json or as CYPRESS_E2E_* environment variables.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      signIn(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('signIn', () => {
  cy.env<{ E2E_DOMAIN: string; E2E_USERNAME: string; E2E_PASSWORD: string }>([
    'E2E_DOMAIN',
    'E2E_USERNAME',
    'E2E_PASSWORD',
  ]).then(({ E2E_DOMAIN, E2E_USERNAME, E2E_PASSWORD }) => {
    Cypress.log({
      message: [`🔐 Authenticating: ${E2E_USERNAME}`],
      autoEnd: false,
    });

    cy.origin(E2E_DOMAIN, { args: { username: E2E_USERNAME, password: E2E_PASSWORD } }, ({ username, password }) => {
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(`${password}{enter}`, { log: false });
    });
  });

  cy.url().should('equal', 'http://localhost:4200/home');
});

export {};
