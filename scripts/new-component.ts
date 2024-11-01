/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { toCamelCase } = require('./utils.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(
    '\x1b[1mEnter a component name:\x1b[0m ',
    (componentName: string) => {
        const camelComponentName =
            toCamelCase(componentName)[0].toUpperCase() +
            toCamelCase(componentName).slice(1);

        const componentPath = path.join(
            __dirname,
            '..',
            'src',
            'components',
            camelComponentName,
        );

        if (fs.existsSync(componentPath)) {
            console.error(`Component "${camelComponentName}" already exists.`);
            rl.close();
            process.exit(1);
        }

        const INDEX_TEMPLATE = `import { ${camelComponentName} } from './${camelComponentName}';

export default ${camelComponentName};
`;

        const SCSS_TEMPLATE = `.container {

}
`;

        const REACT_COMPONENT_TEMPLATE = `import React from 'react';
import styles from './${camelComponentName}.module.scss';

export const ${camelComponentName} = () => {
    return (
        <div className={styles.container}>

        </div>
    );
};
`;

        const STORYBOOK_TEMPLATE = `import type { Meta, StoryObj } from '@storybook/react';
import { ${camelComponentName} } from './${camelComponentName}';

const meta = {
    title: 'Components/${camelComponentName}',
    component: ${camelComponentName},
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
    },
    args: {
        text: 'Hello world',
    },
} satisfies Meta<typeof ${camelComponentName}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
`;

        const VISUAL_TEST_TEMPLATE = `import { test, expect } from '@playwright/test';

test('visual regression', async ({ page }) => {
    await page.goto(
        '/iframe.html?args=&id=components-${componentName}--default',
    );

    await expect(page.locator('#storybook-root')).toHaveScreenshot(
        '${componentName}.png',
    );
});

`;

        const files = [
            {
                newPath: `${camelComponentName}.module.scss`,
                content: SCSS_TEMPLATE,
            },
            {
                newPath: `${camelComponentName}.tsx`,
                content: REACT_COMPONENT_TEMPLATE,
            },
            {
                newPath: `${camelComponentName}.stories.ts`,
                content: STORYBOOK_TEMPLATE,
            },
            {
                newPath: `tests/${camelComponentName}.visual.spec.ts`,
                content: VISUAL_TEST_TEMPLATE,
            },
            {
                newPath: `index.ts`,
                content: INDEX_TEMPLATE,
            },
        ];

        try {
            fs.mkdirSync(componentPath, { recursive: true });

            files.forEach(({ newPath }) => {
                const dirPath = newPath.split('/').slice(0, -1).join('/'); // Extract directory path
                fs.mkdirSync(path.join(componentPath, dirPath), {
                    recursive: true,
                });
            });

            files.forEach(({ newPath, content }) => {
                fs.writeFileSync(path.join(componentPath, newPath), content);
                console.log(`Created file: \x1b[4m${newPath}\x1b[0m`);
            });
            console.log(
                `\n\x1b[32mComponent "${camelComponentName}" created successfully!\x1b[0m\n`,
            );
        } catch (error) {
            console.error('Error creating component:', error);
        }

        rl.close();
    },
);
