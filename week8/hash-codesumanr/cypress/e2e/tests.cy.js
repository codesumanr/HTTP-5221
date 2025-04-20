describe('Form', () => {
    beforeEach(() => {
        // Intercept all network calls to JS & CSS files
        const config = (req) => {
            req.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
            req.continue();
        };
        cy.intercept('GET', '**/*.js', config).as('jsFiles');
        cy.intercept('GET', '**/*.css', config).as('cssFiles');

        cy.visit('/exercise/form.html', {
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
        it('should load all CSS files correctly, if needed', () =>
            cy.document().then(doc => {
                const cssTags = doc.querySelectorAll('link[href$=".css"]');
                cssTags.length > 0 && cy.wait('@cssFiles').then(req => expect(req.response.statusCode).to.eq(200));
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
        it("should hide the #welcome_message section visually", () => {
            cy.get("#welcome_message").should("not.be.visible");
        });

        it("should hide the #welcome_message section from screen readers", () => {
            cy.get("#welcome_message").should("have.attr", "aria-hidden", "true");
        });

        it("should have main heading on the page (h1)", () => {
            cy.get('h1').its('length').then(length => assert.equal(length, 1));
        });
        it('form should have "novalidate" attribute', () => {
            cy.get('form').should('have.attr', 'novalidate');
        });
        [
            { selector: 'username_input', label: 'Username' },
            { selector: 'password_input', label: 'Password' },
        ].forEach(({ selector, label }) => {
            describe(`${selector}`, () => {
                it(`#${selector} element should have label "${label}"`, () => {
                    cy.get(`label[for="${selector}"]`).first().invoke('text').then(text => assert.equal(text.replace(/['"]/g, '').trim(), label))
                });
                it(`#${selector} should have correct type`, () => {
                    cy.get(`#${selector}`).should('have.attr', 'type', 'text');
                });
                it(`#${selector} should have necessary attribute`, () => {
                    cy.get(`#${selector}`)
                        .should('have.attr', 'name')
                        .and('not.be.empty');
                });
            });
        });
    });
    describe("Valid inputs", () => {
        beforeEach(() => {
            cy.get("#username_input").type("John_Mike");
        });
        it("should show #welcome_message for correct password", () => {
            cy.get("#password_input").type("r8g#(0ASD@%");
            cy.get('input[type="submit"], button[type="submit"]').click();
            cy.get("#welcome_message").should('be.visible');
            cy.get("#welcome_message").should("contain", "Your password is correct");
        });
        it("should show #welcome_message for incorrect password", () => {
            cy.get("#password_input").type("123");
            cy.get('input[type="submit"], button[type="submit"]').click();
            cy.get("#welcome_message").should('be.visible');
            cy.get("#welcome_message").should("contain", "Your password is incorrect");
        });
        it("should not hide #welcome_message from screen readers", () => {
            cy.get("#password_input").type("r8g#(0ASD@%");
            cy.get('input[type="submit"], button[type="submit"]').click();
            cy.get("#welcome_message")
                .should(($el) => {
                    const ariaHidden = $el.attr('aria-hidden');
                    expect(ariaHidden === 'false' || ariaHidden === undefined).to.be.true;
                });
        });
    });

    describe('Validation', () => {
        describe('Username input', () => {
            it(`should mark field #username_input as invalid for screen readers if field is empty and form is submitted`, () => {
                cy.get(`#username_input`).clear()
                cy.get('input[type="submit"], button[type="submit"]').click();
                cy.get(`#username_input`).should('be.visible')
                    .and('have.attr', 'aria-invalid', 'true');
            });
            it(`should style field #username_input with red border color (rgb(255, 0, 0)) if field is empty and form is submitted`, () => {
                cy.get(`#username_input`).clear()
                cy.get('input[type="submit"], button[type="submit"]').click();
                cy.get(`#username_input`).should('have.css', 'border-color')
                    .and('equal', 'rgb(255, 0, 0)');
            });

            it(`should reset field #username_input to valid after it was invalid and got correct input`, () => {
                cy.get('input[type="submit"], button[type="submit"]').click();

                cy.get(`#username_input`).clear().type('Valid');

                cy.get('input[type="submit"], button[type="submit"]').click();

                cy.get(`#username_input`)
                    .should(($el) => {
                        const ariaInvalid = $el.attr('aria-invalid');
                        expect(ariaInvalid === 'false' || ariaInvalid === undefined).to.be.true;
                    });
                cy.get(`#username_input`).should('have.css', 'border-color')
                    .and('not.equal', 'rgb(255, 0, 0)');
            });
            ['in val id', '&$#', 'John!'].forEach(i => {
                it(`should mark field #username_input as invalid if user types '${i}'`, () => {
                    cy.get('#username_input').type(`${i}`);
                    cy.get('input[type="submit"], button[type="submit"]').click();
                    cy.get(`#username_input`).should('have.css', 'border-color')
                        .and('equal', 'rgb(255, 0, 0)');
                    cy.get(`#username_input`).should('be.visible')
                        .and('have.attr', 'aria-invalid', 'true');
                });
            });
        });

        describe('Password input', () => {
            it(`should mark field #password_input as invalid for screen readers if field is empty and form is submitted`, () => {
                cy.get(`#password_input`).clear()
                cy.get('input[type="submit"], button[type="submit"]').click();
                cy.get(`#password_input`).should('be.visible')
                    .and('have.attr', 'aria-invalid', 'true');
            });
            it(`should style field #password_input with red border color (rgb(255, 0, 0)) if field is empty and form is submitted`, () => {
                cy.get(`#password_input`).clear()
                cy.get('input[type="submit"], button[type="submit"]').click();
                cy.get(`#password_input`).should('have.css', 'border-color')
                    .and('equal', 'rgb(255, 0, 0)');
            });

            it(`should reset field #password_input to valid after it was invalid and got correct input`, () => {
                cy.get('input[type="submit"], button[type="submit"]').click();

                cy.get(`#password_input`).clear().type('12345');

                cy.get('input[type="submit"], button[type="submit"]').click();

                cy.get(`#password_input`)
                    .should(($el) => {
                        const ariaInvalid = $el.attr('aria-invalid');
                        expect(ariaInvalid === 'false' || ariaInvalid === undefined).to.be.true;
                    });
                cy.get(`#password_input`).should('have.css', 'border-color')
                    .and('not.equal', 'rgb(255, 0, 0)');
            });
            ['8a.7', '1 2 3', '&$-#'].forEach(i => {
                it(`should mark field #password_input as invalid if user types '${i}'`, () => {
                    cy.get('#password_input').type(`${i}`);
                    cy.get('input[type="submit"], button[type="submit"]').click();
                    cy.get(`#password_input`).should('have.css', 'border-color')
                        .and('equal', 'rgb(255, 0, 0)');
                    cy.get(`#password_input`).should('be.visible')
                        .and('have.attr', 'aria-invalid', 'true');
                });
            });
        });

        it(`should not show the #welcome_message if any of the field is empty`, () => {
            cy.get('input[type="submit"], button[type="submit"]').click();
            cy.get('#welcome_message').should('not.be.visible');
        });

    });
});


describe('Quiz', () => {
    beforeEach(() => {
        cy.visit('/exercise/quiz.html');

        Cypress.on('fail', () => {
            throw new Error('There is a mistake in your solution. Please review your answer.');
        });
        Cypress.on('uncaught:exception', () => false);
        Cypress.Screenshot.defaults({screenshotOnRunFailure: false});
    });
    [
        { question: 1, expected: 'HEAD~1' },
        { question: 2, expected: 3 },
        { question: 3, expected: 1 },
        { question: 4, expected: 1 },
        { question: 5, expected: 2 },
        { question: 6, expected: 'async' },
        { question: 7, expected: '64' },
        { question: 8, expected: '32' },
        { question: 9, expected: 'be55ef3f4c4e6c2d9c2afe2a33ac90ad0f50d4de7f9163999877e2a9ca5a54f8' },
    ].forEach(({ question, expected }) => {
        it(`should have correct answer for Question ${question}`, () => {
            cy.get(`#q${question} .answer`)
                .invoke("text")
                .then((text) => assert.equal(text.replace(/['"]/g, "").trim(), expected));
        })
    });
});