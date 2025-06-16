import type { Meta, StoryObj } from '@storybook/nextjs';
import BasicLink from './BasicLink';

const meta = {
    title: 'Components/Links/BasicLink',
    component: BasicLink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        url: { control: 'text' },
        text: { control: 'text' },
        external: { control: 'boolean' },
        className: { control: 'text' },
    },
    args: {
        url: 'https://example.com',
        text: 'Example link',
    },
} satisfies Meta<typeof BasicLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExternalLink: Story = {
    args: {
        url: 'https://example.com',
        text: 'External link',
        external: true,
    },
};
