Cypress.Commands.add('signIn', (username, password) => {
  const log = Cypress.log({
    displayName: 'AUTH0 LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    // @ts-ignore
    autoEnd: false,
  })

  cy.origin(
    Cypress.env('E2E_DOMAIN'),
    {args: {username, password}},
    ({username, password}) => {
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(password, {log: false});
      cy.get('button[type=submit]').first().click();
    }
  )

  cy.url().should('equal', 'http://localhost:4200/home')
})
