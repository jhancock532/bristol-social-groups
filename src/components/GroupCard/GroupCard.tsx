import React from 'react';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { Event } from '@/types/Event';

import styles from './GroupCard.module.scss';

type GroupCardProps = {
    name: string;
    description: string;
    slug: string;
    events: Event[];
};

/**
 * Displays group information and a series of cards for events hosted by the group.
 *
 * @param {string} name - The name of the group
 * @param {string} description - A one to two sentence description of the group
 * @param {string} slug - The URL slug where the user can find more information about the group within this website
 * @param {Event[]} events - An array of events hosted by the group
 */
const GroupCard = ({ name, description, slug, events }: GroupCardProps) => {
    return (
        <div className={styles.container}>
            <Link href={`/events/${slug}`} className={styles.title__link}>
                <h2 className={styles.title}>{name}</h2>
            </Link>

            <p className={styles.description}>{description}</p>

            <div className={styles.eventDetailsContainer}>
                {events.map((event: Event, index: number) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>
        </div>
    );
};

export default GroupCard;
