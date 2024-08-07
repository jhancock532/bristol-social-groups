import type { Meta, StoryObj } from '@storybook/react';
import SingleMarkerMap from './SingleMarkerMap';

const meta = {
    title: 'Components/SingleMarkerMap',
    component: SingleMarkerMap,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        latitude: { control: 'number' },
        longitude: { control: 'number' },
        address: { control: 'text' },
    },
} satisfies Meta<typeof SingleMarkerMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        latitude: 51.45054,
        longitude: -2.594809,
        address: 'William III, Queen Square, BS1 4LH',
    },
};
