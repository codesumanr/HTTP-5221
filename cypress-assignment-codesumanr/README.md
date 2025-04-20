## Assignment

This is an assignment to assess your knowledge of Cypress. Please review the instructions below for details.

### The task

In the `assignment.js` file create a JS code according to the task. The task can be found in `assignment.html`.
In the `assignment.html` file create a HTML page according to the task.
In the `assignment.spec.cy.js` file in `cypress/e2e` folder create tests for the assignment.

### Order of Assignment Completion

1. Create a local folder for your project.
2. Go to your classroom repository on GitHub and copy its URL.
3. Use `git clone` with the copied URL to clone the repository to your local machine.
4. Open the project in your code editor.
5. If your editor suggests installing dependencies, ignore the suggestion.
6. Create a new Git branch for your work.
7. Complete the assignment locally.
8. Add and commit your changes.
9. Push your changes to GitHub.
10. Create a Pull Request (PR) with your changes on GitHub.
11. The PR should be between main branch and your feature branch.
12. Wait until automated tests run to check your code. 
- If the tests pass successfully, merge your PR.
- If the tests fail, check the details to identify which answer is not correct.
- Fix the issue locally and push the new changes to GitHub.
13. If your tests passed and you merged your PR, add a link to your repo into Blackboard as submission for this assignment.

### Run tests locally

You can check your work locally before pushing your changes to GitHub.

Install all necessary modules for testing:
- npm install

Run Jasmine tests:
- npx cypress open
- 
Run ESLint tests for your Cypress code:
- npx eslint 'cypress/e2e/assignment*js'
- 
Run ESLint tests for your JS code:
- npx eslint 'assignment*js'

