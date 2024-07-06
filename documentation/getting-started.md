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
