describe('Unit test', () => {
    beforeEach(() => {
        // Intercept all network calls to JS & CSS files
        const config = (req) => {
            req.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
            req.continue();
        };
        cy.intercept('GET', '**/*.js', config).as('jsFiles');

        cy.visit('/exercise/exercise.html', {
            onBeforeLoad(win) {
                cy.spy(win.console, 'log').as('console.log');
                cy.spy(win.console, 'error').as('console.error');
            }
        });

        Cypress.on('fail', () => {
            throw new Error('There is a mistake in your solution. Please review your answer.');
        });
        Cypress.on('uncaught:exception', () => false);
        Cypress.Screenshot.defaults({screenshotOnRunFailure: false});
    });
    describe('Network Errors', () => {
        it('should load all JavaScript files correctly', () =>
            cy.document().then(doc => {
                const jsTags = doc.querySelectorAll('script[src$=".js"]');
                jsTags.length > 0 && cy.wait('@jsFiles').then(req => expect(req.response.statusCode).to.eq(200));
            })
        );
        it('should not contain inline JavaScript', () =>
            cy.document().then(doc =>
                doc.querySelectorAll('script').forEach(script =>
                    (script.src && !script.src.includes('cypress')) && expect(script.textContent.trim()).to.be.empty
                )
            )
        );
        it('should not have any errors/notes in console', () => {
            cy.get('@console.log').should('not.have.been.called');
            cy.get('@console.error').should('not.have.been.called');
        });
    });
    describe('Humber ID Validator Tests', () => {

        it('should display "Test passed: function returned true"', () => {
            cy.get('#results').contains('p', 'Test passed: function returned true').should('exist');
        });

        it('should display 4 "Test passed: function returned false" messages', () => {
            cy.get('#results')
                .find('p')
                .filter(':contains("Test passed: function returned false")')
                .should('have.length', 4);
        });

        it('should display "Test passed: function returned Input should not be an empty string."', () => {
            cy.get('#results').contains('p', 'Test passed: function returned Input should not be an empty string.').should('exist');
        });

        it('should display "Test passed: function returned Please, don\'t use null here."', () => {
            cy.get('#results').contains('p', 'Test passed: function returned Please, don\'t use null here.').should('exist');
        });

        it('should display "Test passed: function returned Undefined is not a valid input."', () => {
            cy.get('#results').contains('p', 'Test passed: function returned Undefined is not a valid input.').should('exist');
        });

        it('should display "Test passed: function returned Invalid input provided."', () => {
            cy.get('#results').contains('p', 'Test passed: function returned Invalid input provided.').should('exist');
        });
    });
});
