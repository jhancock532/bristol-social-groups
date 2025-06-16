import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName:
                                            '[name]__[local]--[hash:base64:5]',
                                    },
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    implementation: require.resolve('sass'),
                                    additionalData: `@use "sass:math"; @use "variables" as *; @use "mixins" as *;`,
                                    sassOptions: {
                                        includePaths: ['src/styles'],
                                    },
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
                        type: 'asset/resource',
                    },
                ],
            },
        },
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    staticDirs: ['../public'],
    webpackFinal: async (config) => {
        if (config.resolve) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '/images': path.resolve(__dirname, '../public/images'),
            };
        }
        return config;
    },
};
export default config;
