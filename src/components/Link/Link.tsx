import React from 'react';
import NextLink from 'next/link';
import styles from './Link.module.scss';
import { ExternalIcon } from '../Icons/ExternalIcon';

type LinkProps = {
    url: string;
    text?: string;
    external?: boolean;
    children?: React.ReactNode;
};

const Link = ({ url, text, external, children }: LinkProps) => {
    return (
        <NextLink
            className={styles.link}
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
