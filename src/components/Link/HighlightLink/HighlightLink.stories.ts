import type { Meta, StoryObj } from '@storybook/react';
import HighlightLink from './HighlightLink';

const meta = {
    title: 'Components/Links/HighlightLink',
    component: HighlightLink,
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
} satisfies Meta<typeof HighlightLink>;

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
