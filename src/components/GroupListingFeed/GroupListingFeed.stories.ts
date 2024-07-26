import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_GROUPS } from '@/stories/mocks';
import GroupListingFeed from './GroupListingFeed';

const meta = {
    title: 'Components/GroupListingFeed',
    component: GroupListingFeed,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        groups: { control: 'object' },
        selectedWeekday: {
            control: 'select',
            options: [
                'All',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
        },
    },
} satisfies Meta<typeof GroupListingFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        groups: MOCK_GROUPS,
        selectedWeekday: 'All',
    },
};

export const FilteredByWeekday: Story = {
    args: {
        groups: MOCK_GROUPS,
        selectedWeekday: 'Monday',
    },
};

export const SingleGroup: Story = {
    args: {
        groups: [MOCK_GROUPS[0]],
        selectedWeekday: 'All',
    },
};
