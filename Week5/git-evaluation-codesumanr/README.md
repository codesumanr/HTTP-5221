## Instructions: How to Complete This Test

This is an evaluation test to assess your ability to use Git in your workflow. Please review the instructions below for details.

### Coding Part

In the `index.html` file in `exercise` folder, create a form with the following elements:

1. A label with the text **Email**.
2. An input field where the user can type their email address.
3. A submit button to submit the form.

The form should be simple, and the label should be placed above the input field.

### Git Part

After completing your coding, follow these steps:

1. **Commit your changes**:
    - Make a commit to save your work.
    - Be sure to include a descriptive commit message. This message should consist of a **commit title** (a brief summary of your changes) and a **commit description** (a detailed explanation of what was changed).

   You can check the Git history of this repository to see examples of how commit descriptions are added to previous commits.

2. **Push your changes** to your GitHub Classroom repository.

### GitHub Part

1. **Create a Pull Request (PR)** with your changes on GitHub.

### Notes

- This test is designed to evaluate your knowledge of Git.
- Based on your performance in this assignment, I will identify areas to focus on in teaching.
- This assignment is an opportunity to demonstrate your understanding of Git.
- **Making mistakes is okay**. The goal is to learn.
- **Not being able to commit, push, or create a PR is perfectly fine**—don't worry if you're unsure about any step.

### Hint: Recommended Git Commands

Here are some Git commands that will help you complete this test:

- `git clone`
- `git status`
- `git add`
- `git commit`
- `git push`

### Order of Assignment Completion

1. Create a local folder for your project.
2. Go to your classroom repository on GitHub and copy its URL.
3. Use `git clone` with the copied URL to clone the repository to your local machine.
4. Open the project in your code editor.
5. If your editor suggests installing dependencies, ignore the suggestion.
6. Create a new Git branch for your work.
7. Complete the assignment.
8. Add and commit your changes.
9. Set your upstream branch.
10. Push your changes to GitHub.
11. Create a Pull Request (PR) with your changes on GitHub.
12. Automated tests will run to check your code.
13. If the tests pass successfully, merge your PR. This completes your work.
14. If the tests fail, check the logs to identify the issue.
15. Fix the issue locally and push the new changes to GitHub.
16. If you are unable to resolve the issues, that's okay—I will still review your work.

### How To Set Up SSH

#### MacOS

1. **Generate an SSH key on your machine:**

   Open a terminal and run the following commands:

   ```bash
   cd ~/.ssh
   ssh-keygen -t ed25519 -C "your_email"

- Replace "your_email" with the email address associated with your GitHub account.
- When prompted with "Enter file in which to save the key", type github as the file name and press Enter. Do not change the location.
- When prompted for a passphrase, leave it empty and press Enter twice.

This will generate an SSH key pair. To confirm, list the files in the `~/.ssh` directory:

`ls ~/.ssh`

You should see:

`github` (your private key)
`github.pub` (your public key)

There may be other files in this directory as well.

2. **Add your public key to your GitHub account**

- Log in to GitHub.
- Click on your profile picture in the top-right corner, then select Settings.
- In the left sidebar, select SSH and GPG keys.
- Click New SSH key.

For the Title, use something descriptive (e.g., "MacBook Air Key" to indicate this key was generated on your MacBook Air).
For Key type, leave it as "Authentication key."
To get the key, run the following command in the terminal to display the contents of your github.pub file:

`cat ~/.ssh/github.pub`

Copy the output (your public key) and paste it into the Key field on GitHub, then click Add SSH key.

3. **Add your private key to the SSH agent**

First, start the SSH agent by running:

`eval "$(ssh-agent -s)"`

Then, add your private key to the agent:

`ssh-add ~/.ssh/github`

Make sure you're adding the private key (`github`), not the public key (`github.pub`).

4. **Verify that the key has been added**

To check that your key was added successfully, run:

`ssh-add -l -E sha256`

This should display your key, confirming that it's been added.

5. **Test the connection to GitHub:**

To verify that your SSH setup works, run:

`ssh -T git@github.com`

If everything is set up correctly, you should see a welcome message with your GitHub username.

6. **Set up SSH agent to start automatically**

To ensure the SSH agent starts automatically every time you open a terminal, you need to add the following lines to your shell profile.

First, check which shell you’re using:

`echo $SHELL`

If the output is `/bin/bash`, you're using Bash. In that case, create or update the .bash_profile file in your home directory (`~`):

Add the following lines to the file:

`eval "$(ssh-agent -s)"`
`ssh-add ~/.ssh/github`

Save the file and restart your terminal for the changes to take effect.

If you're using a different shell (e.g., Zsh), you'll need to update the appropriate shell configuration file (e.g., .zshrc).

#### Windows

1. **Generate an SSH key on your machine:**

   Open PowerShell (or Command Prompt) and run the following commands:

   `mkdir $HOME\.ssh`
   `cd $HOME\.ssh`
   `ssh-keygen -t ed25519 -C "your_email"`

- Replace "your_email" with the email address associated with your GitHub account.
- When prompted with "Enter file in which to save the key", type github as the file name and press Enter. Do not change the location.
- When prompted for a passphrase, leave it empty and press Enter twice.

This will generate an SSH key pair. To confirm, and you should see:

`github` (your private key)
`github.pub` (your public key)

2. **Add your public key to your GitHub account**

- Log in to GitHub.
- Click on your profile picture in the top-right corner, then select Settings.
- In the left sidebar, select SSH and GPG keys.
- Click New SSH key.

For the Title, use something descriptive (e.g., "Windows Key" to indicate this key was generated on your Windows).
For Key type, leave it as "Authentication key."
To get the key, run the following command in PowerShell to display the contents of your github.pub file:

`Get-Content $HOME\.ssh\github.pub`

Copy the output (your public key) and paste it into the Key field on GitHub, then click Add SSH key.

3. **Add your private key to the SSH agent**

First, start the SSH agent by running:

`Start-Service ssh-agent`

Then, add your private key to the agent:

`ssh-add $HOME\.ssh\github`

Make sure you're adding the private key (`github`), not the public key (`github.pub`).

4. **Verify that the key has been added**

To check that your key was added successfully, run:

`ssh-add -l -E sha256`

This should display your key, confirming that it's been added.

5. **Test the connection to GitHub:**

To verify that your SSH setup works, run:

`ssh -T git@github.com`

If everything is set up correctly, you should see a welcome message with your GitHub username.

6. **Set up SSH agent to start automatically**

To ensure the SSH agent starts automatically every time you open a terminal, you need to add the following lines to your PowerShell profile.

Open PowerShell and check which profile file is being used:

`$PROFILE`

This will display the path to your PowerShell profile file.

Open the profile file in a text editor and add the following lines to the file:

`Start-Service ssh-agent`
`ssh-add $HOME\.ssh\github`

Save the file and restart your PowerShell for the changes to take effect.
