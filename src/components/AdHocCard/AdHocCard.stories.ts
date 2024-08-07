import type { Meta, StoryObj } from '@storybook/react';
import AdHocCard from './AdHocCard';

const meta = {
    title: 'Components/Cards/AdHocCard',
    component: AdHocCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        url: { control: 'text' },
    },
    args: {
        url: 'https://example.com',
    },
} satisfies Meta<typeof AdHocCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
