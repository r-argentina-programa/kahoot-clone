/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />

describe('Kahoot host path', () => {
  let pin;
  let responsePin;

  it('Goes to the select trivia page and makes sure the PIN is random', () => {
    cy.visit('/');
    cy.get('.join-host').click();
    cy.get('.to-trivia-select').click();

    cy.request('http://localhost:5000/trivialist').as('triviaList');
    cy.get('@triviaList').should((response) => {
      responsePin = response.body.pin;
    });

    cy.wait(3000);

    pin = cy.get('.display-pin');

    cy.visit('/');
    cy.get('.join-host').click();
    cy.get('.to-trivia-select').click();
    cy.get('.display-pin').should('not.eq', pin);
  });

  it('Checks that there are 2 trivia options', () => {
    cy.wait(500);
    cy.get('.containerTriviaButton').find('button').should('have.length', 2);
  });

  it('connects host to a new created game', () => {
    cy.get('.triviaButton0').click();

    cy.request(`http://localhost:5000/${responsePin}/trivia1`).as('game-creation');
    cy.get('@game-creation').should((response) => {
      expect(response.body).to.deep.equal({ connected: true });
    });
  });

  it('Checks that the PIN is the same before and after choosing the trivia', () => {
    cy.wait(500);
    cy.get('.display-pin')
      .invoke('text')
      .then((text1) => {
        cy.get('.triviaButton1').click();
        cy.get('.pin-host-lobby')
          .invoke('text')
          .should((text2) => {
            expect(text1).to.eq(text2);
          });
      });
  });

  it('Joins the trivia and checks that the host cant answer', () => {
    cy.get('button').click();
    cy.get('.answers').find('.answer').should('have.class', 'clicked');
  });

  it('Checks that the answers change when clicking "Next Question"', () => {
    cy.get('.answer0')
      .invoke('text')
      .then((text1) => {
        cy.get('.next-question').click();
        cy.get('.answer0')
          .invoke('text')
          .should((text2) => {
            expect(text1).not.to.equal(text2);
          });
      });
  });

  it('Goes to the final question and then to the root', () => {
    cy.get('.next-question').click();
    cy.get('.stopGame').click();
    cy.location('href').should('equal', 'http://localhost:3000/');
  });
});
