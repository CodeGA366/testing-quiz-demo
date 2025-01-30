describe('Quiz e2e', () => {
  beforeEach(() => {
    // Visit the page where the Quiz component is rendered
    cy.visit('http://127.0.0.1:3001/'); // Adjust the URL as necessary
  });

  it('should start the quiz when the start button is clicked', () => {
    // Check that the start button is visible
    cy.get('button').contains('Start Quiz').should('be.visible');

    // Click the start button
    cy.get('button').contains('Start Quiz').click();

    // Verify that the quiz has started
    cy.get('h2').should('not.contain', 'Start Quiz');
  });

  it('should display questions and allow answers', () => {
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();

    // Verify that the first question is displayed
    cy.get('h2').should('exist');

    // Click on the first answer
    cy.get('button').first().click();

    // Check if the next question is displayed
    cy.get('h2').should('exist'); // Adjust this to check for the next question text
  });

  it('should complete the quiz and show the score', () => {
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();

    // Answer all questions
    cy.get('button').first().click();//1
    cy.get('button').first().click();//2
    cy.get('button').first().click();//3
    cy.get('button').first().click();//4
    cy.get('button').first().click();//5
    cy.get('button').first().click();//6
    cy.get('button').first().click();//7
    cy.get('button').first().click();//8
    cy.get('button').first().click();//9
    cy.get('button').first().click();//10


    // Verify that the quiz is completed
    cy.get('h2', { timeout:10000}).contains("Quiz Completed").should('be.visible').debug();

    // Check the score display
    cy.get('button').contains('Take New Quiz').should('exist');
  });

  it('should allow starting a new quiz after completion', () => {
    // Start the quiz
    cy.get('button').contains('Start Quiz').click();

    // Answer all questions
    cy.get('button').first().click();//1
    cy.get('button').first().click();//2
    cy.get('button').first().click();//3
    cy.get('button').first().click();//4
    cy.get('button').first().click();//5
    cy.get('button').first().click();//6
    cy.get('button').first().click();//7
    cy.get('button').first().click();//8
    cy.get('button').first().click();//9
    cy.get('button').first().click();//10

    // Complete the quiz
    cy.get('button').contains('Take New Quiz').click();

  });
});


