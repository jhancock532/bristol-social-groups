# Bristol Social Groups

A website listing social groups in Bristol, UK. [Check out the live site](https://bristolsocialgroups.com/), and read about the project ethos on [the about page](https://bristolsocialgroups.com/about).

The design system for this project is built with Storybook and hosted with GitHub Pages. [View the project components & style guide here](https://jhancock532.github.io/bristol-social-groups/?path=/docs/introduction--docs).

## AI

The repo has a few automation tools for developers, found in the `/scripts` directory. Most of these require an Anthropic API key, and usually cost around 0.5 - 2 cents to run (with the exception of [data migrations](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/migrations.md), which usually take 10 - 15 cents to run).

All the group data is stored in the `data/groups` directory. It's likely that this data will be moved to a BE service at some point, experimenting with AI migrations here has proved quite flexible so far.

## Documentation Index

- [Getting started](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/getting-started.md) - a guide for developers new to the project to get up and running.
- [Codebase introduction](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/codebase-introduction.md) - an overview of the repository and how key aspects of the site functions
- [Styling](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/styling.md) - how CSS is applied to the site.
- [Group JSON file format documentation](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/group-json-files.md) - information about how the group data is stored.
- [Groups to add](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/groups-to-add.md) - a backlog list of groups yet to be triaged and added to the site.
- [Development roadmap](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/development-roadmap.md) - a todo list of new features and improvements to the site.
- [Development ethos](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/development-ethos.md) - why the site has been made the way it has.
