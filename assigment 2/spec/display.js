document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('numberForm');
    const input = document.getElementById('check_number');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = checkNumber(input.value);
        
        // Update result display
        resultDiv.textContent = message;
        resultDiv.hidden = false;
        
        // Update input styling and accessibility
        if (message !== 'Congratulations!') {
            input.classList.add('invalid');
            input.setAttribute('aria-invalid', 'true');
        } else {
            input.classList.remove('invalid');
            input.setAttribute('aria-invalid', 'false');
        }
    });
});