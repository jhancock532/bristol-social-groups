import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_GROUPS } from '@/stories/mocks';
import GroupListingMap from './GroupListingMap';

const meta = {
    title: 'Components/GroupListingMap',
    component: GroupListingMap,
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
} satisfies Meta<typeof GroupListingMap>;

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
