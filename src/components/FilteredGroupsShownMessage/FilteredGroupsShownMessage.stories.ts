import type { Meta, StoryObj } from '@storybook/nextjs';
import { MOCK_GROUPS } from '@/stories/mocks';
import FilteredGroupsShownMessage from './FilteredGroupsShownMessage';

const meta = {
    title: 'Components/FilteredGroupsShownMessage',
    component: FilteredGroupsShownMessage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        filteredGroups: { control: 'object' },
        numberOfPossibleGroups: { control: 'number' },
    },
} satisfies Meta<typeof FilteredGroupsShownMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MixOfRegularAndAdHocGroups: Story = {
    args: {
        filteredGroups: {
            regularGroups: [MOCK_GROUPS[0], MOCK_GROUPS[2]],
            adHocGroups: [MOCK_GROUPS[1]],
        },
        numberOfPossibleGroups: 4,
    },
};

export const NoRegularGroups: Story = {
    args: {
        filteredGroups: {
            regularGroups: [],
            adHocGroups: [MOCK_GROUPS[1]],
        },
        numberOfPossibleGroups: 3,
    },
};

export const NoAdHocGroups: Story = {
    args: {
        filteredGroups: {
            regularGroups: [MOCK_GROUPS[0], MOCK_GROUPS[2]],
            adHocGroups: undefined,
        },
        numberOfPossibleGroups: 3,
    },
};

export const AllGroupsIncludedInResults: Story = {
    args: {
        filteredGroups: {
            regularGroups: [MOCK_GROUPS[0], MOCK_GROUPS[2]],
            adHocGroups: [MOCK_GROUPS[1]],
        },
        numberOfPossibleGroups: 3,
    },
};

export const NoGroupsFound: Story = {
    args: {
        filteredGroups: {
            regularGroups: [],
            adHocGroups: [],
        },
        numberOfPossibleGroups: 10,
    },
};
