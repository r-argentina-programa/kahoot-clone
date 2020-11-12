/// <reference types="cypress" />
it('should get to the user lobby with a name and pin', () => {
  cy.visit('/');
  cy.get('.join-user').click();
  cy.get('.input-pin').should('exist');
  cy.get('.input-pin').type('0');
  cy.get('.input-nick').type('Nicolas Rivarola');
  cy.get('.btn-submit-data-user').click();
  cy.get('.lobby-pin').should('contain', '0');
  cy.get('.lobby-nick').should('contain', 'Nicolas Rivarola');
  cy.request('http://localhost:8080/connect?url=http://localhost:3000/');
  cy.request('http://localhost:8080/message?m=start-game');
});
