import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
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
                ],
            },
        }
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    staticDirs: ['../public'],
};
export default config;
