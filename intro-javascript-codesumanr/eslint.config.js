module.exports = {
  rules: {
    // Enforce the use of let or const, disallowing var
    'no-var': 'error',

    // Prefer const for variables that are never reassigned
    'prefer-const': 'error',

    // Disallow unnecessary semicolons (optional but recommended)
    'no-extra-semi': 'error',
  }
};
