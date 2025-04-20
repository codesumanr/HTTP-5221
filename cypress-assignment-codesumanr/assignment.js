// Add your JS code below to complete the task.
document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('login_form');
    const passwordForm = document.getElementById('password_form');
    const nameInput = document.getElementById('name_input');
    const emailInput = document.getElementById('email_input');
    const usernameInput = document.getElementById('username_input');
    const passwordInput = document.getElementById('password_input');
    const outputContainer = document.getElementById('output_container');
    const outputValues = document.getElementById('output_values');

    const errorClass = 'input_error'; //  class name

    // Display Correct Form ---
    const params = new URLSearchParams(window.location.search);
    const showLogin = params.get('login') === 'true';
    const showPassword = params.get('password') === 'true';

    if (showLogin) {
        loginForm.style.display = 'block';
        passwordForm.style.display = 'none';
    } else if (showPassword) {
        passwordForm.style.display = 'block';
        loginForm.style.display = 'none'; 
    }

    
    function handleFormSubmit(event, input1, input2) {
        event.preventDefault(); 

        // Clear previous errors and hide output
        input1.classList.remove(errorClass);
        input2.classList.remove(errorClass);
        outputContainer.style.display = 'none';

        const value1 = input1.value.trim();
        const value2 = input2.value.trim();

        let firstInvalidInput = null;

        // Validation
        if (!value1 && !value2) {
            input1.classList.add(errorClass);
            firstInvalidInput = input1;
        } else if (!value1) {
            input1.classList.add(errorClass);
            firstInvalidInput = input1;
        } else if (!value2) {
            input2.classList.add(errorClass);
            firstInvalidInput = input2;
        }

        if (firstInvalidInput) {
            firstInvalidInput.focus(); 
        } else {
           
            outputValues.textContent = `${value1}, ${value2}`;
            outputContainer.style.display = 'block'; // Show output
            input1.value = ''; // Clear fields
            input2.value = '';
            
            input1.focus();
        }
    }

    // --- Add Submit Event Listeners to Forms ---
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            handleFormSubmit(event, nameInput, emailInput);
        });
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', (event) => {
            handleFormSubmit(event, usernameInput, passwordInput);
        });
    }
});