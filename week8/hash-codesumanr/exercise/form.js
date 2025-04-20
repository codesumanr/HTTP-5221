document.getElementById('book-form').addEventListener('submit', function (event) {
  event.preventDefault();
  clearErrors();

  const firstName = document.getElementById('first_input').value.trim();
  const lastName = document.getElementById('last_input').value.trim();
  const email = document.getElementById('email_input').value.trim();

  const books = [
      {
          title: document.getElementById('title_input_1').value.trim(),
          author: document.getElementById('author_input_1').value.trim(),
          price: document.getElementById('price_input_1').value.trim(),
      },
      {
          title: document.getElementById('title_input_2').value.trim(),
          author: document.getElementById('author_input_2').value.trim(),
          price: document.getElementById('price_input_2').value.trim(),
      },
      {
          title: document.getElementById('title_input_3').value.trim(),
          author: document.getElementById('author_input_3').value.trim(),
          price: document.getElementById('price_input_3').value.trim(),
      },
  ];

  let isValid = true;

  // Validate First Name
  if (!firstName) {
      markInvalid('first_input', 'First Name');
      isValid = false;
  }

  // Validate Last Name
  if (!lastName) {
      markInvalid('last_input', 'Last Name');
      isValid = false;
  }

  // Validate Email
  if (!email.includes('@')) {
      markInvalid('email_input', 'Email');
      isValid = false;
  }

  // Validate Books
  books.forEach((book, index) => {
      if (!book.title) markInvalid(`title_input_${index + 1}`, 'Book Title');
      if (!book.author) markInvalid(`author_input_${index + 1}`, 'Author');
      if (!book.price || isNaN(book.price) || book.price <= 0) markInvalid(`price_input_${index + 1}`, 'Price');
  });

  if (isValid) {
      displayResults(firstName, lastName, books);
  }
});

function markInvalid(inputId, label) {
  const input = document.getElementById(inputId);
  input.classList.add('error');
  document.getElementById(`${inputId}_error`).textContent = `${label} is required.`;
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
  document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
}
