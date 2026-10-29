import './commands';

beforeEach(() => {
  cy.visit('/');
  cy.get('#login').click();
  cy.signIn();
});

afterEach(() => {
  cy.visit('/');
  cy.get('#logout').click();
});
