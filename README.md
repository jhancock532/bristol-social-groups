# Bristol Social

A website listing social groups in Bristol, UK. [Check out the live site](https://bristolsocialgroups.com/), and read about the project ethos on [the about page](https://bristolsocialgroups.com/about).

The design system for this project is built with Storybook and hosted with GitHub Pages. [View the project components & style guide here](https://jhancock532.github.io/bristol-social-groups/?path=/docs/introduction--docs).

## Data storage

Information regarding groups is found in the `data/groups` folder. Each group resides within a separate folder that contains a `details.json` file.

## AI

The repo has a few automation tools for developers - see the `.cursor/rules` prompt files. [Data migrations](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/migrations.md) require an Anthropic API key set in `.env` and cost 15 - 20 cents to run.

## Further docs

- [Getting started](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/getting-started.md)
- [Styling](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/styling.md)
- [Groups to add](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/groups-to-add.md)
- [Development roadmap](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/development-roadmap.md)
- [Development ethos](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/development-ethos.md)

### Testing Setup

This project includes a comprehensive setup for unit testing using **Jest** and **React Testing Library**, ensuring that components are tested from the user's perspective. It also enforces testing best practices through linting and pre-commit hooks.

### What’s Included

- Test files are located in the `src/__tests__/` directory.
- [Jest](https://jestjs.io/) is used as the test runner.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is used to simulate real user interactions and behavior.
- [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) provides custom DOM matchers for more expressive and reliable assertions.
- [`eslint-plugin-testing-library`](https://github.com/testing-library/eslint-plugin-testing-library) is integrated into the ESLint config to enforce best practices when writing tests.

### Running Tests

To run tests manually:

```sh
npm test
```
This is defined in your `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```
### Pre-commit Checks with Husky

This project uses Husky to ensure code quality before every commit. The pre-commit hook runs a custom task that includes:
```sh
  npm run pre-commit-tasks
```
This command runs:

- `npm test` – Validates that components work as expected  
- `npm run lint` – Detects and flags style or logic issues

These automated checks help maintain code reliability and consistency throughout the development process.

### Continuous Integration

A GitHub Actions CI pipeline is configured to automatically run all tests and checks on:

- Every pull request

- Every push to the main branch

This ensures no breaking changes are introduced during development or code review.

### Further Reading

To learn more about writing effective tests with React Testing Library, check out [this guide by Kent C. Dodds](https://testing-library.com/docs/intro/).

