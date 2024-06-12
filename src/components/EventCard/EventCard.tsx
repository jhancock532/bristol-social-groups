import React from 'react';
import Link from 'next/link';

import {
    EventCost,
    EventLocation,
    EventTime,
    EventBooking,
} from '@/types/types';
import { getAMPMTimeFromDateString } from '@/utils/utils';

import { ClockIcon } from '@/components/Icons/ClockIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';

import styles from './EventCard.module.scss';

type Event = {
    cost: EventCost;
    time: EventTime;
    location?: EventLocation;
    locationURL?: string;
    booking: EventBooking;
    url: string;
};

export const EventDetails = ({
    cost,
    time,
    location,
    locationURL,
    booking,
    url,
}: Event) => {
    const formattedSessionPrice = cost.sessionPrice.toFixed(2);

    return (
        <div className={styles.details}>
            <div className={styles.details__item}>
                <ClockIcon className={styles.details__icon} />
                <p>
                    {time.frequency === 'Weekly' ? (
                        <>
                            Every <strong>{time.weekday}</strong>
                        </>
                    ) : (
                        <strong>{time.frequency}</strong>
                    )}{' '}
                    from{' '}
                    <strong>{getAMPMTimeFromDateString(time.start)}</strong> to{' '}
                    <strong>{getAMPMTimeFromDateString(time.end)}</strong>
                </p>
            </div>
            <div className={styles.details__item}>
                <WalletIcon className={styles.details__icon} />
                <p>
                    Costs <strong>£{formattedSessionPrice}</strong> per session
                </p>
            </div>
            <div className={styles.details__item}>
                <ReceiptIcon className={styles.details__icon} />
                <p>
                    {booking.required ? (
                        <strong>Advance booking required</strong>
                    ) : (
                        'No advance booking required'
                    )}
                </p>
            </div>
            <div className={styles.details__item}>
                <LocationIcon className={styles.details__icon} />
                <div className={styles.locationContainer}>
                    {location && (
                        <p>
                            Located at{' '}
                            <a
                                className={styles.googleMapsLink}
                                href={location.googleMapsLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {location.address}
                                <ExternalIcon />
                            </a>
                        </p>
                    )}
                    {locationURL && (
                        <p>
                            This event&apos;s location changes,{' '}
                            <Link
                                href={locationURL}
                                className={styles.googleMapsLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                click here for the latest details
                                <ExternalIcon />
                            </Link>
                        </p>
                    )}
                </div>
            </div>
            <div className={styles.details__item}>
                <a
                    className={styles.externalLink}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                >
                    View event host&apos;s website <ExternalIcon />
                </a>
            </div>
        </div>
    );
};

type EventCardProps = {
    name: string;
    description: string;
    slug: string;
    events: Event[];
};

const EventCard = ({ name, description, slug, events }: EventCardProps) => {
    return (
        <div className={styles.container}>
            <Link href={`/events/${slug}`} className={styles.title__link}>
                <h2 className={styles.title}>{name}</h2>
            </Link>

            <p className={styles.description}>{description}</p>

            <div className={styles.eventDetailsContainer}>
                {events.map((event: Event, index: number) => (
                    <EventDetails key={index} {...event} />
                ))}
            </div>
        </div>
    );
};

export default EventCard;
