import React from 'react';
import { IconProps } from '@/types/types';

type ExpandIconProps = IconProps & {
    pointDownwards?: boolean;
};

export const ExpandIcon = ({
    className,
    fill,
    pointDownwards = false,
}: ExpandIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            style={{
                transform: pointDownwards
                    ? 'scaleY(-1) translateY(-1px)'
                    : 'rotate(0deg)',
            }}
        >
            <path
                d="M12 8.29498L6 14.295L7.41 15.705L12 11.125L16.59 15.705L18 14.295L12 8.29498Z"
                fill={fill || 'currentColor'}
            />
        </svg>
    );
};
