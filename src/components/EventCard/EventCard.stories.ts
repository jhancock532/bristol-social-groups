import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_EVENTS } from '@/stories/mocks';
import EventCard from './EventCard';

const meta = {
    title: 'Components/Cards/EventCard',
    component: EventCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        cost: { control: 'object' },
        time: { control: 'object' },
        location: { control: 'object' },
        locationURL: { control: 'text' },
        booking: { control: 'object' },
        link: { control: 'object' },
        gender: { control: 'text' },
    },
    args: {},
} satisfies Meta<typeof EventCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { ...MOCK_EVENTS[0] },
};
