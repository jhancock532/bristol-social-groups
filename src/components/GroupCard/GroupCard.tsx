import React from 'react';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { DiscordIcon } from '@/components/Icons/DiscordIcon';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import { Event } from '@/types/Event';
import { Link as LinkType } from '@/types/base';

import styles from './GroupCard.module.scss';
import { WhatsappIcon } from '../Icons/WhatsappIcon';

type GroupLinkProps = {
    link: LinkType;
};

const GroupLink = ({ link }: GroupLinkProps) => {
    switch (link.type) {
        case 'Discord':
            return (
                <>
                    <DiscordIcon className={styles.icon} /> Join the Discord
                    server
                </>
            );
        case 'WhatsApp':
            return (
                <>
                    <WhatsappIcon className={styles.icon} /> Join the WhatsApp
                    group chat
                </>
            );
        case 'Meetup':
            return (
                <>
                    View the group on Meetup <ExternalIcon />
                </>
            );
        case 'Instagram':
            return (
                <>
                    View the group on Instagram <ExternalIcon />
                </>
            );
        case 'Facebook':
            return (
                <>
                    View the group on Facebook <ExternalIcon />
                </>
            );
        case 'Tiktok':
            return (
                <>
                    View the group on TikTok <ExternalIcon />
                </>
            );
        default:
            if (link.text) {
                return (
                    <>
                        {link.text} <ExternalIcon />
                    </>
                );
            }
            return (
                <>
                    Go to the groups website <ExternalIcon />
                </>
            );
    }
};

type GroupLinksProps = {
    links: LinkType[];
};

export const GroupLinks = ({ links }: GroupLinksProps) => {
    return (
        <div className={styles.groupLinkContainer}>
            {links.map((link: LinkType, index: number) => (
                <a
                    key={index}
                    className={styles.externalLink}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                >
                    <GroupLink link={link} />
                </a>
            ))}
        </div>
    );
};

type GroupCardProps = {
    name: string;
    description: string;
    slug: string;
    links: LinkType[];
    events?: Event[];
};

/**
 * Displays group information and a series of cards for events hosted by the group.
 *
 * @param {string} name - The name of the group
 * @param {string} description - A one to two sentence description of the group
 * @param {string} slug - The URL slug where the user can find more information about the group within this website
 * @param {Event[]} events - An array of events hosted by the group
 */
const GroupCard = ({
    name,
    description,
    events,
    links,
    slug,
}: GroupCardProps) => {
    return (
        <div className={styles.container}>
            <Link href={`/groups/${slug}`} className={styles.title__link}>
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

            {links && (
                <div className={styles.links}>
                    <GroupLinks links={links} />
                </div>
            )}
        </div>
    );
};

export default GroupCard;
