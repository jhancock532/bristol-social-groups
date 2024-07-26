import React from 'react';
import { IconProps } from '@/types/Icon';

export const FemaleIcon = ({ className, fill }: IconProps) => {
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
                d="M12 2C9.24 2 7 4.24 7 7C7 9.42 8.72 11.44 11 11.9V14H9V16H11V19H13V16H15V14H13V11.9C15.28 11.44 17 9.42 17 7C17 4.24 14.76 2 12 2ZM12 4C13.66 4 15 5.34 15 7C15 8.66 13.66 10 12 10C10.34 10 9 8.66 9 7C9 5.34 10.34 4 12 4Z"
                fill={fill || 'currentColor'}
            />
        </svg>
    );
};
