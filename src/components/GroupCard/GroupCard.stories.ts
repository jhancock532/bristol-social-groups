import type { Meta, StoryObj } from '@storybook/nextjs';
import { MOCK_EVENTS } from '@/stories/mocks';
import GroupCard from './GroupCard';

const meta = {
    title: 'Components/Cards/GroupCard',
    component: GroupCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        description: { control: 'text' },
        slug: { control: 'text' },
        links: { control: 'object' },
        events: { control: 'object' },
    },
} satisfies Meta<typeof GroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'Group with a single event',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        slug: 'example-group',
        links: [
            {
                type: 'Website',
                url: 'https://example.com/group',
            },
        ],
        events: [MOCK_EVENTS[0]],
        subscriptions: [
            {
                frequency: 'monthly',
                cost: 40,
                costPerEvent: 10,
            },
        ],
    },
};

const EVENTS_WITH_NAMES = MOCK_EVENTS.map((event, index) => ({
    ...event,
    name: `Event ${index + 1}`,
}));

export const MultipleEvents: Story = {
    args: {
        ...Default.args,
        name: 'Group with multiple events',
        events: EVENTS_WITH_NAMES,
    },
};

export const DiscordGroup: Story = {
    args: {
        ...Default.args,
        name: 'Group that organises over Discord',
        events: undefined,
        links: [
            {
                type: 'Discord',
                url: 'https://example.com/group',
            },
        ],
    },
};
