import React from 'react';
import NextLink from 'next/link';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import styles from './BasicLink.module.scss';

type BasicLinkProps = {
    url: string;
    text?: string;
    external?: boolean;
    children?: React.ReactNode;
    className?: string;
};

const BasicLink = ({
    url,
    text,
    external,
    children,
    className,
}: BasicLinkProps) => {
    const classNames = `${styles.link} ${className}`;

    // Make sure that the icon doesn't break away from the link
    const wrapLastWordWithIcon = (content: string) => {
        const words = content.split(/(?=\s[^\s]+$)/);
        return (
            <>
                {words[0]}
                <span className={styles.iconWrapper}>
                    {/* A zero width space, to render the underline between the two words in the link consistently.
                    https://unicode-explorer.com/c/200B */}
                    {'​'}
                    {words[1]}
                    <ExternalIcon />
                </span>
            </>
        );
    };

    // Determine the content to render
    const renderContent = () => {
        if (!external) return text || children;

        if (text) {
            return wrapLastWordWithIcon(text);
        }

        if (typeof children === 'string') {
            return wrapLastWordWithIcon(children);
        }

        // If children is not a string (e.g., it's a complex component),
        // fall back to appending the icon without word wrapping
        return (
            <>
                {children}
                <span className={styles.iconWrapper}>
                    <ExternalIcon className={styles.externalLinkIcon} />
                </span>
            </>
        );
    };

    return (
        <NextLink
            className={classNames}
            href={url}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
        >
            {renderContent()}
        </NextLink>
    );
};

export default BasicLink;
