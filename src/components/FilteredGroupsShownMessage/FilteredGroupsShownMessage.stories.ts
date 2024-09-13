import type { Meta, StoryObj } from '@storybook/react';
import FilteredGroupsShownMessage from './FilteredGroupsShownMessage';

const meta = {
    title: 'Components/FilteredGroupsShownMessage',
    component: FilteredGroupsShownMessage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        numberOfGroupsFiltered: { control: 'number' },
        numberOfPossibleGroups: { control: 'number' },
    },
} satisfies Meta<typeof FilteredGroupsShownMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        numberOfGroupsFiltered: 5,
        numberOfPossibleGroups: 10,
    },
};

export const NoGroupsFound: Story = {
    args: {
        numberOfGroupsFiltered: 0,
        numberOfPossibleGroups: 10,
    },
};
