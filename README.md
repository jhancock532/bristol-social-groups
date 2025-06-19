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

## 🧪 Testing Setup

This project includes unit testing using **Jest** and **React Testing Library**, with tooling to enforce consistent and high-quality tests.

### ✅ What's Included

- **Basic tests** have been added for existing components under the `src/__tests__/` directory.
- **Jest** is configured for unit testing.
- **React Testing Library** is used to test components from the user's perspective.
- **@testing-library/jest-dom** provides custom DOM matchers for better assertions.
- **eslint-plugin-testing-library** is installed and integrated into the ESLint config to enforce testing best practices.
- A `test` script has been added to `package.json`:

  ```json
  "scripts": {
    "test": "jest"
  }
Pre-commit checks using Husky ensure that:

npm test is run to validate components.

npm run lint is executed to catch style and logic issues early.

CI pipeline integration: Tests are run automatically as part of the GitHub Actions workflows to verify that pull requests and commits do not break the app.

💡 For more on best practices with React Testing Library, check out this guide by Kent C. Dodds.