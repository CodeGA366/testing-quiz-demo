/// <reference types="cypress" />

import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.fixture('questions.json').as('questions');
  });

  it('should render the start button', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and display questions', function () {
    cy.fixture('questions').then((questions) => {
        cy.intercept('GET', '/api/questions/random', questions).as('getQuestions');
    });

    mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions', { timeout: 10000 });

});

it('should answer a question and show the next one', function () {
  // Load fixture data
  cy.fixture('questions').then((questions) => {
      // Intercept the API call and return the fixture data
      cy.intercept('GET', '/api/questions/random', questions).as('getQuestions');
  });

  mount(<Quiz />);
  
  // Start the quiz
  cy.get('button').contains('Start Quiz').click();

  // Wait for the question to be displayed
  cy.wait(5000); // Adjust the wait time as necessary

  // Verify that the first question is displayed
  cy.get('h2').should('exist'); // Use a more specific selector if needed

  // Click on the first answer
  cy.get('button').first().click();

  // Check if the next question is displayed
  cy.get('h2').should('exist'); // Adjust this to check for the next question text
});

  it('should complete the quiz and show the score', function () {
    cy.intercept('GET', '/api/questions/random', this.questions).as('getQuestions');

    mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.get('button').first().click();
    cy.get('button').first().click();

    // Verify that the quiz is completed
    cy.get('h2', { timeout:10000}).contains("Quiz Completed").should('be.visible').debug();

    // Check the score display
    cy.get('button').contains('Take New Quiz').should('exist');
  });
});