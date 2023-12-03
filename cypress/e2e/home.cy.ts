describe('Home', () => {
  it('Visits the initial project page', () => {
    cy.contains('Welcome to ng-demo!')
    cy.contains('Search')
  })
})
