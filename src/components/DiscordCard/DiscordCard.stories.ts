import type { Meta, StoryObj } from '@storybook/react';
import DiscordCard from './DiscordCard';

const meta = {
    title: 'Components/Cards/DiscordCard',
    component: DiscordCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        url: { control: 'text' },
    },
    args: {
        url: 'https://discord.gg/example',
    },
} satisfies Meta<typeof DiscordCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
