Cypress.Commands.add('signIn', (username, password) => {
  Cypress.log({
    message: [`🔐 Authenticating: ${username}`],
    autoEnd: false,
  })

  cy.origin(Cypress.env('E2E_DOMAIN'), {args: {username, password}},
    ({username, password}) => {
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(password, {log: false});
      cy.get('button[type=submit]').first().click();
    }
  )

  cy.url().should('equal', 'http://localhost:4200/home')
})
