/// <reference types="cypress" />

before(() => {
  cy.visit('localhost:3000');
});
it('should finish the game', () => {
  cy.get('.startGame').click();
  cy.get('.answer1').click();
  cy.get('.answer3').click();
  cy.get('.answer3').click();
  cy.get('.stopGame').should('exist').click();
});

it('should go back to the lobby', () => {
  cy.get('.startGame').click();
  cy.get('.stopGame').click();
  cy.url().should('include', 'localhost:3000');
});

it('should show at least 1 player', () => {
  cy.get('.list-group-item').should('exist');
});
