import React from 'react';
import Link from 'next/link';
import AdHocCard from '@/components/AdHocCard';
import DiscordCard from '@/components/DiscordCard';
import EventCard from '@/components/EventCard';
import { Event } from '@/types/Event';
import { GroupType } from '@/types/Group';

import styles from './GroupCard.module.scss';

type GroupCardProps = {
    name: string;
    description: string;
    slug: string;
    type?: GroupType;
    url?: string;
    events?: Event[];
};

/**
 * Displays group information and a series of cards for events hosted by the group.
 *
 * @param {string} name - The name of the group
 * @param {string} description - A one to two sentence description of the group
 * @param {string} slug - The URL slug where the user can find more information about the group within this website
 * @param {string} type - The type of group, e.g. "Regular" or "Ad-hoc"
 * @param {string} url - A URL where the user can find more information about the group
 * @param {Event[]} events - An array of events hosted by the group
 */
const GroupCard = ({
    name,
    description,
    slug,
    type,
    url,
    events,
}: GroupCardProps) => {
    return (
        <div className={styles.container}>
            <Link href={`/events/${slug}`} className={styles.title__link}>
                <h2 className={styles.title}>{name}</h2>
            </Link>

            <p className={styles.description}>{description}</p>

            {events && (
                <div className={styles.eventDetailsContainer}>
                    {events.map((event: Event, index: number) => (
                        <EventCard key={index} {...event} />
                    ))}
                </div>
            )}

            {type === 'Discord' && url && <DiscordCard url={url} />}

            {type === 'Ad-hoc' && url && <AdHocCard url={url} />}
        </div>
    );
};

export default GroupCard;
