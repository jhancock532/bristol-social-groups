import React from 'react';
import NextLink from 'next/link';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import styles from './HighlightLink.module.scss';

type HighlightLinkProps = {
    url: string;
    text?: string;
    external?: boolean;
    children?: React.ReactNode;
    className?: string;
};

const HighlightLink = ({
    url,
    text,
    external,
    children,
    className,
}: HighlightLinkProps) => {
    const classNames = `${styles.link} ${className}`;

    return (
        <NextLink
            className={classNames}
            href={url}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
        >
            {text || children}
            {external ? (
                <ExternalIcon className={styles.externalLinkIcon} />
            ) : undefined}
        </NextLink>
    );
};

export default HighlightLink;
