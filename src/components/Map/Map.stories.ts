import type { Meta, StoryObj } from '@storybook/nextjs';
import { MOCK_GROUPS } from '@/stories/mocks';
import Map from './Map';

const meta = {
    title: 'Components/Map',
    component: Map,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        groups: { control: 'object' },
    },
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        groups: MOCK_GROUPS,
    },
};
