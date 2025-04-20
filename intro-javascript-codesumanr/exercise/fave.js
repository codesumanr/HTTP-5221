window.onload = function () {
    const form = document.querySelector('form[name="fave_form"]');
    const faveBlock = document.getElementById('fave-block');
    const faveList = document.getElementById('fave-list');

    // Hide faveBlock for screen readers and visually
    faveBlock.style.display = 'none';
    faveBlock.setAttribute("aria-hidden", "true");

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Clear previous list
        faveList.innerHTML = '';

        // Validate inputs
        let isValid = true;
        const friends = [];

        for (let i = 1; i <= 3; i++) {
            const inputName = document.getElementById(`name_${i}`);
            const inputPhone = document.getElementById(`phone_${i}`);

            if (!inputName.value || !inputPhone.value) {
                isValid = false;
                if (!inputName.value) {
                    inputName.setAttribute('aria-invalid', 'true');
                } else {
                    inputName.removeAttribute('aria-invalid');
                }
                if (!inputPhone.value) {
                    inputPhone.setAttribute('aria-invalid', 'true');
                } else {
                    inputPhone.removeAttribute('aria-invalid');
                }
            } else {
                inputName.removeAttribute('aria-invalid');
                inputPhone.removeAttribute('aria-invalid');
                friends.push({
                    name: inputName.value,
                    phone: inputPhone.value
                });
            }
        }

        if (isValid && friends.length === 3) {
            // Hide the form
            form.style.display = 'none';

            // Display the list
            friends.forEach(friend => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${friend.name} Phone: ${friend.phone}`;
                faveList.appendChild(listItem);
            });

            // Show the fave-block section for both visual users and screen readers
            faveBlock.style.display = 'block';
            faveBlock.removeAttribute("aria-hidden");
        }
    });
};
