describe('Jasmine Assignment', () => {
    beforeEach(() => {
        const config = (req) => {
            req.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
            req.continue();
        };
        cy.intercept('GET', '**/*.js', config).as('jsFiles');

        cy.visit('/assignment/assignment.html');

        Cypress.on('fail', () => {
            throw new Error('There is a mistake in your solution. Please review your answer.');
        });
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
    });
    describe("Initial Page Load", () => {
        it("should have main heading on the page (h1)", () => {
            cy.get('h1').its('length').then(length => assert.equal(length, 1));
        });
        it('form should have "novalidate" attribute', () => {
            cy.get('form').should('have.attr', 'novalidate');
        });
        [
            { selector: 'check_number', label: 'Number' },
        ].forEach(({ selector, label }) => {
            describe(`${selector}`, () => {
                it(`#${selector} element should have label "${label}"`, () => {
                    cy.get(`label[for="${selector}"]`).first().invoke('text').then(text => assert.equal(text.replace(/['"]/g, '').trim(), label))
                });
                it(`#${selector} should have correct type`, () => {
                    cy.get(`#${selector}`).should('have.attr', 'type', 'text');
                });
                it(`#${selector} should have name attribute`, () => {
                    cy.get(`#${selector}`)
                        .should('have.attr', 'name')
                        .and('not.be.empty');
                });
            });
        });
    });
    describe('Validation', () => {
        describe('Number input', () => {
            it(`should mark field #check_number as invalid for screen readers if field is empty and form is submitted`, () => {
                cy.get(`#check_number`).clear()
                cy.get('input[type="submit"], button[type="submit"]').click();
                cy.get(`#check_number`).should('be.visible')
                    .and('have.attr', 'aria-invalid', 'true');
            });

            it(`should style field #check_number with red border color (rgb(255, 0, 0)) if field is empty and form is submitted`, () => {
                cy.get(`#check_number`).clear()
                cy.get('input[type="submit"], button[type="submit"]').click();
                cy.get(`#check_number`).should('have.css', 'border-color')
                    .and('equal', 'rgb(255, 0, 0)');
            });

            it(`should reset field #check_number to valid after it was invalid and got correct input (87)`, () => {
                cy.get('input[type="submit"], button[type="submit"]').click();
                cy.get(`#check_number`).clear().type('87');
                cy.get('input[type="submit"], button[type="submit"]').click();
                cy.get(`#check_number`)
                    .should(($el) => {
                        const ariaInvalid = $el.attr('aria-invalid');
                        expect(ariaInvalid === 'false' || ariaInvalid === undefined).to.be.true;
                    });
                cy.get(`#check_number`).should('have.css', 'border-color')
                    .and('not.equal', 'rgb(255, 0, 0)');
            });
            ['17', 'in val id', '&$#', 'John!'].forEach(i => {
                it(`should mark field #check_number as invalid if user types '${i}'`, () => {
                    cy.get('#check_number').type(`${i}`);
                    cy.get('input[type="submit"], button[type="submit"]').click();
                    cy.get(`#check_number`).should('have.css', 'border-color')
                        .and('equal', 'rgb(255, 0, 0)');
                    cy.get(`#check_number`).should('be.visible')
                        .and('have.attr', 'aria-invalid', 'true');
                });
            });
        });
    });
    describe('Check Number', () => {
        const missingInput = 'Missing input';
        const wrongNumber = 'Wrong number';
        const isLessMessage = 'Your number is less than secret. Try again.';
        const isMoreMessage = 'Your number is more than secret. Try again.';
        const congratulations = 'Congratulations!';
        [
            { value: 'not a number', expected: missingInput },
            { value: 16, expected: wrongNumber },
            { value: 17, expected: isLessMessage },
            { value: 18, expected: isLessMessage },
            { value: 98, expected: isMoreMessage },
            { value: 99, expected: isMoreMessage },
            { value: 100, expected: wrongNumber },
            { value: 87, expected: congratulations },
        ].forEach(({ value, expected }) => {
            it(`should display "${expected}" if value is ${value}`, () => {
                cy.get(`#check_number`).clear().type(value);
                cy.get('input[type="submit"], button[type="submit"]').click();
                cy.get('#result').contains(expected).should('exist');
            });
        });
    });
});
