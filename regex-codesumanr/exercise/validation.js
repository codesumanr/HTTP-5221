document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("validation_form");
    const nameInput = document.getElementById("name_input");
    const salaryInput = document.getElementById("salary_input");
    const postalInput = document.getElementById("postal_input");
    const successMessage = document.getElementById("success_message");

    // Regex patterns
    const nameRegex = /^[A-Za-z]+$/; // Only letters
    const salaryRegex = /^\d+$/; // Only numbers
    const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; // Canadian Postal Code format

    // Function to validate name
    function validateName() {
        if (!nameRegex.test(nameInput.value)) {
            nameInput.classList.add("invalid");
            document.getElementById("name_error").textContent = "Name must contain only letters.";
            return false;
        } else {
            nameInput.classList.remove("invalid");
            document.getElementById("name_error").textContent = "";
            return true;
        }
    }

    // Function to validate salary
    function validateSalary() {
        if (!salaryRegex.test(salaryInput.value)) {
            salaryInput.classList.add("invalid");
            document.getElementById("salary_error").textContent = "Salary must contain only numbers.";
            return false;
        } else {
            salaryInput.classList.remove("invalid");
            document.getElementById("salary_error").textContent = "";
            return true;
        }
    }

    // Function to validate postal code
    function validatePostal() {
        if (!postalRegex.test(postalInput.value)) {
            postalInput.classList.add("invalid");
            document.getElementById("postal_error").textContent = "Postal code must follow Canadian format (e.g., A1B 2C3).";
            return false;
        } else {
            postalInput.classList.remove("invalid");
            document.getElementById("postal_error").textContent = "";
            return true;
        }
    }

    // Event listeners for real-time validation
    nameInput.addEventListener("input", validateName);
    salaryInput.addEventListener("input", validateSalary);
    postalInput.addEventListener("input", validatePostal);

    // Form submission handler
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const isNameValid = validateName();
        const isSalaryValid = validateSalary();
        const isPostalValid = validatePostal();

        if (isNameValid && isSalaryValid && isPostalValid) {
            successMessage.textContent = "The form is valid.";
        } else {
            successMessage.textContent = "";
        }
    });
});