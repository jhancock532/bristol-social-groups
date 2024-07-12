import React from 'react';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import styles from './DiscordCard.module.scss';
import { DiscordIcon } from '../Icons/DiscordIcon';

type DiscordCardProps = {
    url: string;
};

const DiscordCard = ({ url }: DiscordCardProps) => (
    <div className={styles.container}>
        <p className={styles.description}>
            <DiscordIcon className={styles.icon} /> Events are organized on the
            groups Discord community.
        </p>
        <a
            className={styles.externalLink}
            href={url}
            target="_blank"
            rel="noreferrer"
        >
            Join the Discord server <ExternalIcon />
        </a>
    </div>
);

export default DiscordCard;
