import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowIcon } from './ArrowIcon';
import { ClockIcon } from './ClockIcon';
import { DiscordIcon } from './DiscordIcon';
import { ExpandIcon } from './ExpandIcon';
import { ExternalIcon } from './ExternalIcon';
import { FemaleIcon } from './FemaleIcon';
import { LocationIcon } from './LocationIcon';
import { MaleIcon } from './MaleIcon';
import { ReceiptIcon } from './ReceiptIcon';
import { WalletIcon } from './WalletIcon';

const meta = {
    title: 'Components/Icons',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Arrow: Story = {
    render: () => <ArrowIcon />,
};

export const Clock: Story = {
    render: () => <ClockIcon />,
};

export const Discord: Story = {
    render: () => <DiscordIcon />,
};

export const Expand: Story = {
    render: () => <ExpandIcon />,
};

export const External: Story = {
    render: () => <ExternalIcon />,
};

export const Female: Story = {
    render: () => <FemaleIcon />,
};

export const Location: Story = {
    render: () => <LocationIcon />,
};

export const Male: Story = {
    render: () => <MaleIcon />,
};

export const Receipt: Story = {
    render: () => <ReceiptIcon />,
};

export const Wallet: Story = {
    render: () => <WalletIcon />,
};
