/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        // allow all scss files access to these files
        includePaths: [path.join(__dirname, 'src/styles')],
        prependData: `@use "sass:math"; @use "variables" as *; @use "mixins" as *;`,
    },
};

module.exports = nextConfig;
