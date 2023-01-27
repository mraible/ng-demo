describe('Edit', () => {

  beforeEach(() => {
    cy.visit('/edit/1')
  });

  it('should allow viewing a person',  () => {
    cy.get('h3').should('have.text', 'Nikola Jokić');
    cy.get('#name').should('have.value', 'Nikola Jokić');
    cy.get('#street').should('have.value', '2000 16th Street');
    cy.get('#city').should('have.value', 'Denver');
  });

  it('should allow updating a name', () => {
    cy.get('#name').type(' Rocks!');
    cy.get('#save').click();
    // verify one element matched this change
    const list = cy.get('app-search mat-list mat-list-item');
    list.should('have.length', 1);
  });
});
