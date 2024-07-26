import React from 'react';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import styles from './AdHocCard.module.scss';

type AdHocCardProps = {
    url: string;
};

const AdHocCard = ({ url }: AdHocCardProps) => (
    <div className={styles.container}>
        <p className={styles.description}>
            Events are organized on an ad-hoc basis. Click the below link to
            find out when the next event is being run.
        </p>
        <a
            className={styles.externalLink}
            href={url}
            target="_blank"
            rel="noreferrer"
        >
            View the group&apos;s website <ExternalIcon />
        </a>
    </div>
);

export default AdHocCard;
