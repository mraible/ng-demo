describe('Home', () => {
  it('Welcomes the user after they log in', () => {
    cy.contains('Welcome to ng-demo!')
    cy.contains('Search')
  })
})
