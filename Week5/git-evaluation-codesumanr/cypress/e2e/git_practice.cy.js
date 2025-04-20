describe('Form Element Tests', () => {
    beforeEach(() => {
        cy.visit('exercise/index.html', {
            onBeforeLoad (win) {
                cy.spy(win.console, 'log').as('console.log');
                cy.spy(win.console, 'error').as('console.error');
            }
        });
    });

    it('should not print to console', () => {
        cy.get('@console.log').should('not.have.been.called');
        cy.get('@console.error').should('not.have.been.called');
    });

    it('should have the form element on the page', () => cy.get('form').should('exist'));

    it('should have a label with the correct text', () => {
        cy.get('input[id]').first().then($input => {
            const inputId = $input.attr('id');
            cy.get(`label[for="${inputId}"]`)
                .should('exist')
                .invoke('text')
                .should('match', /email/i);
        });
    });

    it('should have an input field of type email', () =>
        cy.get('input').should('exist').and('have.attr', 'type', 'email').and('have.attr', 'name')
    );

    it('should have a submit button', () => cy.get('button[type="submit"]').should('exist'));
});
