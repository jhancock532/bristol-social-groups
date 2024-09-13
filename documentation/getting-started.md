# Getting Started

Welcome! This is a guide for developers who would like to run the project locally in development mode.

After cloning the repository to your machine, make sure you have the appropriate Node version installed.

I'd recommend that you use command line tools such as [fnm](https://github.com/Schniz/fnm) (preferred) or [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) to switch your node version to the current version used in the repository.

Once you've installed one of the above, `cd` into this projects root directory and run either of the following:

```bash
fnm use
# or
nvm use
```

After switching to the correct version of Node, install the projects dependencies.

```bash
npm install
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Make sure that you don't have any other app already running on `3000` otherwise the site may show up on another port number.

If you'd like to contribute to the project, create a branch off of `main` with a description of the feature or bug fix.

## Running Storybook

Components used in this project are documented in a Storybook instance. To run storybook locally, use the following command:

`npm run storybook`

To run automated smoke and accessibility tests over the Storybook stories, open a new terminal window. Then run `npm run test-storybook`.

## Running Playwright tests

The Playwright tests for this repository are based on the Storybook instance, so make sure this is running first. There are different methods of setting up your environment depending on the device you are using:

### Linux

Edit your `.env` file so that the `PLAYWRIGHT_BASE_URL=http://localhost:6006`

### Windows and MacOS

Edit your `.env` file so that the `PLAYWRIGHT_BASE_URL=http://host.docker.internal:6006`

Run `npm run docker-playwright` to enter a docker container. This means that CI and you will have the same operating system while testing visual regression, standardising font rendering and other small differences.

### Test commands

You can now run tests using `npm run playwright`

To update snapshots, run `npm run playwright -- --update-snapshots`. If you just want to update one component, use `npm run playwright -- header --update-snapshots` and only the name of the component specified will be run.
