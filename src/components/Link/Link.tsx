import React from 'react';
import HighlightLink from './HighlightLink';
import BasicLink from './BasicLink';

type LinkProps = {
    url: string;
    type?: 'highlight' | 'basic';
    text?: string;
    external?: boolean;
    children?: React.ReactNode;
    className?: string;
};

const Link = ({
    url,
    type = 'highlight',
    text,
    external,
    children,
    className,
}: LinkProps) => {
    if (type === 'highlight') {
        return (
            <HighlightLink
                url={url}
                text={text}
                external={external}
                className={className}
            >
                {children}
            </HighlightLink>
        );
    }

    return (
        <BasicLink
            url={url}
            text={text}
            external={external}
            className={className}
        >
            {children}
        </BasicLink>
    );
};

export default Link;
