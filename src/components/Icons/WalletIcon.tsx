import React from 'react';
import { IconProps } from '@/types/types';

export const WalletIcon = ({ className, fill }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M18 4H6C3.79 4 2 5.79 2 8V16C2 18.21 3.79 20 6 20H18C20.21 20 22 18.21 22 16V8C22 5.79 20.21 4 18 4ZM16.14 13.77C15.9 13.97 15.57 14.05 15.26 13.97L4.15 11.25C4.45 10.52 5.16 10 6 10H18C18.67 10 19.26 10.34 19.63 10.84L16.14 13.77ZM6 6H18C19.1 6 20 6.9 20 8V8.55C19.41 8.21 18.73 8 18 8H6C5.27 8 4.59 8.21 4 8.55V8C4 6.9 4.9 6 6 6Z"
                fill={fill || 'currentColor'}
            />
        </svg>
    );
};
