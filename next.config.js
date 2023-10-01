/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    sassOptions: {
        // allow all scss files access to these files
        includePaths: [path.join(__dirname, 'src/styles')],
        prependData: `@use "sass:math"; @use "variables" as *; @use "mixins" as *;`,
    },

    // Todo: is this really required?
    // Added because fs wasn't found in utils.ts
    // https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
    // webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
};

module.exports = nextConfig;
