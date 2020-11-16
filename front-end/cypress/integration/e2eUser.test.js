/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />

describe('kahoot', () => {
  it('Gets to the lobby and displays pin and nick', () => {
    cy.visit('/');

    cy.request('http://localhost:5000/host-game?pin=0').as('game-creation');
    cy.get('@game-creation').should((response) => {
      expect(response.body).to.deep.equal({ connected: true });
    });

    cy.get('.join-user').click();
    cy.get('.input-pin').should('exist');
    cy.get('.input-pin').type('0');
    cy.get('.input-nick').type('Nicolas Rivarola');

    cy.get('.btn-submit-data-user').click();

    cy.get('.lobby-pin').should('contain', '0');
    cy.get('.lobby-nick').should('contain', 'Nicolas Rivarola');
  });

  it('Starts the game and checks that there is a question and answer', () => {
    cy.request('http://localhost:5000/start-game?questionNumber=0').as('game-started');
    cy.get('@game-started').should((response) => {
      expect(response.body).to.deep.equal({ gameStarted: true });
    });
    cy.wait(500);
    cy.get('.answer0').should('exist');
    cy.get('.answer3').click();
    cy.get('.question').should('exist');
  });

  it('Checks that you can click only one answer, only one time.', () => {
    cy.request('http://localhost:5000/next-question?questionNumber=1').as('second-question');
    cy.get('@second-question').should((response) => {
      expect(response.body).to.deep.equal({ questionSent: true });
    });

    cy.wait(500);
    cy.get('.answer2').click();
    cy.get('.answers').find('.answer').should('have.class', 'clicked');
  });

  it('Checks that the amount of answers rendered is dynamic', () => {
    cy.request('http://localhost:5000/next-question?questionNumber=2').as('final-question');
    cy.get('@final-question').should((response) => {
      expect(response.body).to.deep.equal({ questionSent: true });
    });

    cy.wait(500);
    cy.get('.answers').find('.answer').should('have.length', 2);
  });

  it('Checks that you are redirected to the podium after the final answer', () => {
    cy.request('http://localhost:5000/podium').as('podium');
    cy.get('@podium').should((response) => {
      expect(response.body).to.deep.equal({ podiumSent: true });
    });
  });

  it('Checks that back to root button works', () => {
    cy.get('.stopGame').click();
    cy.location('href').should('equal', 'http://localhost:3000/');
  });
});
