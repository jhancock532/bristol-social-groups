import React from 'react';
import NextLink from 'next/link';
import { ExternalIcon } from '../Icons/ExternalIcon';
import styles from './Link.module.scss';

type LinkProps = {
    url: string;
    text?: string;
    external?: boolean;
    children?: React.ReactNode;
    className?: string;
};

const Link = ({ url, text, external, children, className }: LinkProps) => {
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

export default Link;
