# Codebase introduction

This is a [Next.js](https://nextjs.org/) static site hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

## Group data

Information regarding groups is found in the `data/groups` folder. Each group resides within a separate folder that contains a `details.json` file. For full documentation of the expected data object format, see the [group data object documentation](https://github.com/jhancock532/bristol-social-groups/blob/main/documentation/group-json-files.md).

## Components

Components contain all related code within their own folder, with some base styles and mixins imported from `src/styles`.
