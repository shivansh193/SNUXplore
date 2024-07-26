# SnuXplore_4.0

## Commit naming conventions

<details>
<summary>Read more</summary>

For now, we'll use just these:

- `fix:` - fixes a bug
- `feat:` - new feature
- `chore:` - other changes and cleanups

Example:

- `fix: fixed navigation bar`
- `feat: added new sign in feature`
- `chore: Removed all comments and print statements`

If theres a specific file thats changed or a specific sub category of the project has changes, you can specify it like so:

- `fix(NavBar): fixed overflowing image in nav bar`
- `feat(SignIn): Added user verification before sign In`

These are just good practices and it'll be easy to revert back if some new merge is breaking the project.

</details>


## Pull requests

<details>
<summary>Read more</summary>

Each contributing member should make a separate branch for completing their tasks.
You can follow these commands to do so:

- `git checkout -b <branch name>`
- `git add .`
- `git commit -m "<Meaningful message following the convention>"`
- `git push origin <branch name>`

Then in the github repo, you can create a new pull request under pull requests tab.

To keep your branch up-to-date with the master branch, you can use the following commands:

- `git merge main`
- `git push`

<em>Note: Make sure there are no changes in your branch before merging. If there are any, you'll lose the progress.</em>

</details>
