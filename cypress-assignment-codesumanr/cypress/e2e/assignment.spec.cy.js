// Add your Cypress tests below.
// cypress/e2e/assignment.spec.cy.js

describe('Login/Password Form Assignment Tests', () => {
    
    beforeEach(() => {
       
        cy.visit('assignment.html');
    });

    
    describe("Initial Page Load", () => {
        it("should have a main heading (h1)", () => {
            cy.get('h1').should('exist').and('not.be.empty');
        });

        
        it('should not display any forms by default', () => {
            cy.get('#login_form').should('not.be.visible');
            cy.get('#password_form').should('not.be.visible');
            cy.get('#name_input').should('not.be.visible');
            cy.get('#email_input').should('not.be.visible');
            cy.get('#username_input').should('not.be.visible');
            cy.get('#password_input').should('not.be.visible');
            cy.get('#output_container').should('not.be.visible');
        });

        it('forms should have "novalidate" attribute', () => {
           
            cy.visit('assignment.html?login=true'); // Show login form
            cy.get('#login_form').should('have.attr', 'novalidate');

            cy.visit('assignment.html?password=true'); // Show password form
            cy.get('#password_form').should('have.attr', 'novalidate');
        });

        it('should have correct navigation links/buttons with proper IDs', () => {
            cy.get('#login_field').should('exist').and('contain.text', 'Login Field');
            cy.get('#password_field').should('exist').and('contain.text', 'Password Field');
        });
    });

    // --- Form Visibility Tests ---
    describe("Form Visibility Based on URL Parameter", () => {
       
        it('should display login form when "Login Field" link is followed (login=true)', () => {
            cy.get('#login_field').click(); // Simulates clicking the link
            cy.url().should('include', 'login=true'); 
            cy.get('#login_form').should('be.visible');
            cy.get('#name_input').should('be.visible');
            cy.get('#email_input').should('be.visible');
            cy.get('#password_form').should('not.be.visible'); 
            cy.get('#output_container').should('not.be.visible');
        });

        
        it('should display password form when "Password Field" link is followed (password=true)', () => {
            cy.get('#password_field').click(); 
            cy.url().should('include', 'password=true'); 
            cy.get('#password_form').should('be.visible');
            cy.get('#username_input').should('be.visible');
            cy.get('#password_input').should('be.visible');
            cy.get('#login_form').should('not.be.visible'); 
            cy.get('#output_container').should('not.be.visible');
        });
    });

    // --- Login Form Functionality Tests ---
    describe("Login Form (Name & Email) Validation", () => {
       
        beforeEach(() => {
            cy.visit('assignment.html?login=true');
            cy.get('#login_form').should('be.visible'); 
        });

       
        it('should show error on Name input and focus it when both fields are empty on submit', () => {
            cy.get('#login_form button[type="submit"]').click();
            cy.get('#name_input')
                .should('have.class', 'input_error')
                .and('be.focused');
            cy.get('#email_input')
                .should('not.have.class', 'input_error')
                .and('not.be.focused');
            cy.get('#output_container').should('not.be.visible');
        });

       
        it('should show error on Name input and focus it when Name is empty and Email is not', () => {
            cy.get('#email_input').type('test@example.com');
            cy.get('#login_form button[type="submit"]').click();
            cy.get('#name_input')
                .should('have.class', 'input_error')
                .and('be.focused');
            cy.get('#email_input')
                .should('not.have.class', 'input_error')
                .and('not.be.focused');
            cy.get('#output_container').should('not.be.visible');
        });

       
        it('should show error on Email input and focus it when Email is empty and Name is not', () => {
            cy.get('#name_input').type('Test User');
            cy.get('#login_form button[type="submit"]').click();
            cy.get('#email_input')
                .should('have.class', 'input_error')
                .and('be.focused');
            cy.get('#name_input')
                .should('not.have.class', 'input_error')
                .and('not.be.focused');
            cy.get('#output_container').should('not.be.visible');
        });

        
        it('should submit successfully, display output, and clear fields when both are filled', () => {
            const name = 'Test User';
            const email = 'test@example.com';

            cy.get('#name_input').type(name);
            cy.get('#email_input').type(email);
            cy.get('#login_form button[type="submit"]').click();

            // Check output
            cy.get('#output_container').should('be.visible');
            cy.get('#output_values').should('have.text', `${name}, ${email}`); 
            // Verify fields are cleared
            cy.get('#name_input').should('have.value', '');
            cy.get('#email_input').should('have.value', '');

            // Verify no error classes
            cy.get('#name_input').should('not.have.class', 'input_error');
            cy.get('#email_input').should('not.have.class', 'input_error');
        });
    });

    // --- Password Form Functionality Tests ---
    describe("Password Form (Username & Password) Validation", () => {
      
        beforeEach(() => {
            cy.visit('assignment.html?password=true');
            cy.get('#password_form').should('be.visible'); 
        });

       
        it('should show error on Username input and focus it when both fields are empty on submit', () => {
            cy.get('#password_form button[type="submit"]').click();
            cy.get('#username_input')
                .should('have.class', 'input_error')
                .and('be.focused');
            cy.get('#password_input')
                .should('not.have.class', 'input_error')
                .and('not.be.focused');
            cy.get('#output_container').should('not.be.visible');
        });

        
        it('should show error on Username input and focus it when Username is empty and Password is not', () => {
            cy.get('#password_input').type('secret123');
            cy.get('#password_form button[type="submit"]').click();
            cy.get('#username_input')
                .should('have.class', 'input_error')
                .and('be.focused');
            cy.get('#password_input')
                .should('not.have.class', 'input_error')
                .and('not.be.focused');
            cy.get('#output_container').should('not.be.visible');
        });

        
        it('should show error on Password input and focus it when Password is empty and Username is not', () => {
            cy.get('#username_input').type('testuser');
            cy.get('#password_form button[type="submit"]').click();
            cy.get('#password_input')
                .should('have.class', 'input_error')
                .and('be.focused');
            cy.get('#username_input')
                .should('not.have.class', 'input_error')
                .and('not.be.focused');
            cy.get('#output_container').should('not.be.visible');
        });

       
        it('should submit successfully, display output, and clear fields when both are filled', () => {
            const username = 'testuser';
            const password = 'secret123';

            cy.get('#username_input').type(username);
            cy.get('#password_input').type(password);
            cy.get('#password_form button[type="submit"]').click();

            // Check output
            cy.get('#output_container').should('be.visible');
            cy.get('#output_values').should('have.text', `${username}, ${password}`); // Use have.text

            // Verify fields are cleared
            cy.get('#username_input').should('have.value', '');
            cy.get('#password_input').should('have.value', '');

            // Verify no error classes
            cy.get('#username_input').should('not.have.class', 'input_error');
            cy.get('#password_input').should('not.have.class', 'input_error');
        });
    });

    
    describe('HTML Structure and Labels', () => {
        it('Login form fields should have correct labels', () => {
             cy.visit('assignment.html?login=true');
             cy.get('label[for="name_input"]').should('contain.text', 'Name');
             cy.get('label[for="email_input"]').should('contain.text', 'Email');
        });

        it('Password form fields should have correct labels', () => {
             cy.visit('assignment.html?password=true');
             cy.get('label[for="username_input"]').should('contain.text', 'Username');
             cy.get('label[for="password_input"]').should('contain.text', 'Password');
        });
    });

});