import './commands';

beforeEach(() => {
  cy.visit('/')
  cy.get('#login').click()
  cy.signIn(
    Cypress.env('E2E_USERNAME'),
    Cypress.env('E2E_PASSWORD')
  )
})

afterEach(() => {
  cy.visit('/')
  cy.get('#logout').click()
})
